import {defineField, defineType} from 'sanity'
import {PiPersonArmsSpreadFill} from 'react-icons/pi'

export default defineType({
  name: 'player',
  type: 'document',
  title: 'Player',
  icon: PiPersonArmsSpreadFill,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'pcode',
      type: 'string',
      title: 'PCode',
      validation: (Rule) =>
        Rule.length(3)
          .uppercase()
          .regex(/^[A-Z]{3}$/, {name: 'pcode'}),
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Currently Active',
      initialValue: true,
    }),
    defineField({
      name: 'seasons_active',
      type: 'array',
      title: 'Seasons Active',
      of: [
        {
          type: 'reference',
          to: [{type: 'season'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'divisions',
      type: 'array',
      title: 'Divisions',
      of: [
        {
          type: 'reference',
          to: [{type: 'division'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'discord_id',
      title: 'Discord ID',
      description:
        'To Access, turn on Discord Developer mode, right click a user in discord, and click "Copy User ID".',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Player Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
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
