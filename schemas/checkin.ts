import {defineField, defineType} from 'sanity'
import {BsBuildingFillCheck} from 'react-icons/bs'
import moment from 'moment'

export default defineType({
  name: 'checkin',
  type: 'document',
  title: 'Check Ins',
  icon: BsBuildingFillCheck,
  fields: [
    defineField({
      name: 'discord_name',
      type: 'string',
      title: 'Discord Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discord_id',
      type: 'string',
      title: 'Discord ID',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'checkin_status',
      type: 'string',
      title: 'Check-In Status',
      options: {
        list: [
          {title: 'Unknown', value: 'unknown'},
          {title: 'Unavailable', value: 'unavailable'},
          {title: 'RSVP', value: 'rsvp'},
          {title: 'Checked-In', value: 'checkedin'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meet',
      type: 'reference',
      title: 'Meet',
      to: [{type: 'meet'}],
      options: {
        disableNew: true,
      },
    }),
  ],
  preview: {
    select: {
      name: 'discord_name',
      check_in: 'checkin_status',
      meet: 'meet.meet_time',
    },
    prepare(selection) {
      const {name, check_in, meet} = selection
      const map = {
        rsvp: `is RSVP'd`,
        unknown: `hasn't responded`,
        checkedin: `is Checked-In`,
        unavailable: `is unavailable`,
      } as const
      const status = map[check_in as keyof typeof map]
      return {
        title: `${name} ${status}`,
        subtitle: `${moment(meet).format('ddd MMM Do')}`,
      }
    },
  },
})
