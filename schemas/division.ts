import {defineField, defineType} from 'sanity'
import {IoPodiumSharp} from 'react-icons/io5'

export default defineType({
  name: 'division',
  type: 'document',
  title: 'Division',
  icon: IoPodiumSharp,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Name of the Tier. ex. "S-Tier"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'season',
      type: 'reference',
      title: 'Season',
      to: [{type: 'season'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      season: 'season.number',
    },
    prepare(selection) {
      const {name, season} = selection
      return {
        title: `S${season ?? '-unknown'}: ${name}`,
      }
    },
  },
})
