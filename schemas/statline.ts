import {defineField, defineType} from 'sanity'
import {VscJson} from 'react-icons/vsc'

export default defineType({
  name: 'statline',
  type: 'document',
  title: 'Statline',
  icon: VscJson,
  fieldsets: [{name: 'post_match', title: 'Post Match Screen Stats'}],
  fields: [
    defineField({
      name: 'match',
      type: 'reference',
      title: 'Match',
      to: [{type: 'match'}],
      options: {disableNew: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'player',
      type: 'reference',
      title: 'Player',
      to: [{type: 'player'}],
      options: {disableNew: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'outcome',
      type: 'string',
      title: 'Match Outcome',
      options: {
        list: [
          {title: 'Win', value: 'win'},
          {title: 'Loss', value: 'loss'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kos',
      type: 'number',
      title: 'KOs',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().max(6).integer(),
    }),
    defineField({
      name: 'falls',
      type: 'number',
      title: 'Falls',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().max(5).integer(),
    }),
    defineField({
      name: 'self_destructs',
      type: 'number',
      title: 'Self-Destructs',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().max(5).integer(),
    }),
    defineField({
      name: 'damage_given',
      type: 'number',
      title: 'Damage Given',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'damage_taken',
      type: 'number',
      title: 'Damage Taken',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
  ],
  preview: {
    select: {
      season: 'match.season.number',
      game: 'match.game_number',
      player: 'player.pcode',
      outcome: 'outcome',
    },
    prepare({season, game, player, outcome}) {
      return {
        title: `Statline S${season}: G${game}`,
        subtitle: `${player} > ${outcome}`,
        imageUrl:
          outcome === 'win'
            ? 'https://fakeimg.pl/1000x1000/e0d1a8?retina=1&text=🏆'
            : 'https://fakeimg.pl/1000x1000/2e2e2e?retina=1&text=🪦',
      }
    },
  },
})

// *[
//   _type== "statline" &&
//   match->season->number == '2'
// ] {
//   match-> {
//     game_number,
//     season-> {
//       number
//     }
//   },
//   player-> {
//     name,
//     pcode
//   },
//   outcome,
//   kos,
//   falls,
//   self_destructs,
//   damage_given,
//   damage_taken
// }
