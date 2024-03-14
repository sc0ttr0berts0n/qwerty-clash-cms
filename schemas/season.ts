import {defineField, defineType} from 'sanity'
import {TbLetterQ} from 'react-icons/tb'

export default defineType({
  name: 'season',
  type: 'document',
  title: 'Season',
  icon: TbLetterQ,
  fields: [
    defineField({
      name: 'number',
      type: 'string',
      title: 'Season Number',
    }),
    defineField({
      name: 'start_date',
      type: 'datetime',
      title: 'Start Date',
    }),
    defineField({
      name: 'end_date',
      type: 'datetime',
      title: 'End Date',
    }),
    defineField({
      name: 'player_count',
      type: 'number',
      title: 'Player Count',
      validation: (Rule) => Rule.integer().positive().greaterThan(0),
    }),
  ],
})
