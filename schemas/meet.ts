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
