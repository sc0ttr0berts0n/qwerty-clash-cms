import {defineField, defineType} from 'sanity'
import {GiSwordClash} from 'react-icons/gi'

export default defineType({
  name: 'match',
  type: 'document',
  title: 'Match',
  icon: GiSwordClash,
  fields: [
    defineField({
      name: 'season',
      type: 'reference',
      title: 'Season',
      to: [{type: 'season'}],
      options: {disableNew: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'game_number',
      type: 'string',
      title: 'Game Number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'match_status',
      type: 'string',
      title: 'Match Status',
      initialValue: 'pending',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'team_a',
      type: 'array',
      title: 'Team A',
      of: [
        {
          type: 'reference',
          to: [{type: 'player'}],
        },
      ],
      validation: (Rule) => Rule.required().unique().length(2),
    }),
    defineField({
      name: 'team_b',
      type: 'array',
      title: 'Team B',
      of: [
        {
          type: 'reference',
          to: [{type: 'player'}],
        },
      ],
      validation: (Rule) => Rule.required().unique().length(2),
    }),
  ],
  preview: {
    select: {
      gameNumber: 'game_number',
      season: 'season.number',
      status: 'match_status',
      pa: 'team_a.0.pcode',
      pb: 'team_a.1.pcode',
      pc: 'team_b.0.pcode',
      pd: 'team_b.1.pcode',
    },
    prepare(selection) {
      const {gameNumber, season, status, pa, pb, pc, pd} = selection
      return {
        title: `Match S${season}-G${gameNumber} | ${status}`,
        subtitle: `${pa} & ${pb} vs ${pc} & ${pd}`,
        imageUrl:
          status === 'pending'
            ? 'https://fakeimg.pl/1000x1000/ffcccc?retina=1&text=💤'
            : 'https://fakeimg.pl/1000x1000/ccffcc?retina=1&text=✅',
      }
    },
  },
})
