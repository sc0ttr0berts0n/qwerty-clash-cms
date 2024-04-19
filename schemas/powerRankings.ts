import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'power_rankings',
  type: 'document',
  title: 'Power Rankings',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'meets',
      type: 'array',
      title: 'meets',
      of: [
        {
          type: 'reference',
          to: [{type: 'meet'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      pcode: 'pcode',
      avatar: 'avatar.asset',
    },
    prepare(selection) {
      const {name, pcode, avatar} = selection
      return {
        title: name,
        subtitle: pcode,
        media: avatar,
      }
    },
  },
})
