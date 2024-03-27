import {defineField, defineType} from 'sanity'
import {VscJson} from 'react-icons/vsc'

export default defineType({
  name: 'test_statline',
  type: 'document',
  title: 'Test Statline',
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
      name: 'character_selected',
      type: 'reference',
      title: 'Character Selected',
      to: [{type: 'playable_characters'}],
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
      name: 'falls',
      type: 'number',
      title: 'Falls',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().max(5).integer(),
    }),
    defineField({
      name: 'kos',
      type: 'number',
      title: 'KOs',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().max(6).integer(),
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
    defineField({
      name: 'self_destructs',
      type: 'number',
      title: 'Self-Destructs',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().max(5).integer(),
    }),
    defineField({
      name: 'damage_peak',
      type: 'number',
      title: 'Damage Peak',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'ground_time',
      type: 'string',
      title: 'Ground Time',
      fieldset: 'post_match',
      description: 'Enter time in mm:ss format',
      validation: (Rule) => Rule.required().regex(/^([0-5]?[0-9]):([0-5]?[0-9])$/, 'Time must be in mm:ss format'),
    }),
    defineField({
      name: 'air_time',
      type: 'number',
      title: 'Air Time',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'hit_rate',
      type: 'number',
      title: 'Hit Rate',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'ground_attacks',
      type: 'number',
      title: 'Ground Attacks',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'air_attacks',
      type: 'number',
      title: 'Air Attacks',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'smash_attacks',
      type: 'number',
      title: 'Smash Attacks',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'grabs',
      type: 'number',
      title: 'Grabs',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'throws',
      type: 'number',
      title: 'Throws',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'projectiles',
      type: 'number',
      title: 'Projectiles',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'edge_grabs',
      type: 'number',
      title: 'Edge Grabs',
      fieldset: 'post_match',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'out_time',
      type: 'number',
      title: 'Out Time',
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
