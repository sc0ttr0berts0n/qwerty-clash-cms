import {defineField, defineType} from 'sanity'
import moment from 'moment'
import {FaCalendarAlt} from 'react-icons/fa'

export default defineType({
  name: 'meet',
  type: 'document',
  title: 'Meet',
  icon: FaCalendarAlt,

  fields: [
    defineField({
      name: 'meet_time',
      type: 'datetime',
      title: 'Meet Time',
      options: {
        dateFormat: 'ddd MMM Do',
        timeFormat: 'h:mm a',
        timeStep: 5,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'match',
      type: 'array',
      title: 'Matches',
      of: [
        {
          type: 'reference',
          to: [{type: 'match'}],
        },
      ],

      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'scratches',
      type: 'array',
      title: 'Scratched Matches',
      of: [
        {
          type: 'reference',
          to: [{type: 'match', options: {filter: `match_status == 'completed'`}}],
        },
      ],

      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'notes',
      type: 'text',
      title: 'Admin Notes',
    }),
    defineField({
      name: 'publish_overrides',
      type: 'string',
      title: 'Publish Overrides',
      initialValue: 'none',
      options: {
        list: [
          {title: 'No Overrides', value: 'none'},
          {title: 'Force Publish', value: 'force_show'},
          {title: 'Force Hide', value: 'force_hide'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publish_time',
      type: 'datetime',
      title: 'Publish Time',
      options: {
        dateFormat: 'ddd MMM Do',
        timeFormat: 'h:mm a',
        timeStep: 5,
      },
      description: 'When this meet will be visible on the site. Generally 3 days before the match.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'remove_time',
      type: 'datetime',
      title: 'Remove Time',
      options: {
        dateFormat: 'ddd MMM Do',
        timeFormat: 'h:mm a',
        timeStep: 5,
      },
      description:
        'When this meet will be removed from the site. Generally midnight after the match.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      date: 'meet_time',
    },
    prepare(selection) {
      const {date} = selection
      return {
        title: `${moment(date).format('ddd MMM Do')}`,
        subtitle: `${moment(date).format('[at] h:mm a')}`,
      }
    },
  },
})
