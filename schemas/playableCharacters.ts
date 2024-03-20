import {defineField, defineType} from 'sanity'
import { GiCharacter } from "react-icons/gi";

export default defineType({
  name: 'playable_characters',
  type: 'document',
  title: 'Playable Characters',
  icon: GiCharacter,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      avatar: 'avatar.asset',
    },
    prepare(selection) {
      const {name, avatar} = selection
      return {
        title: name,
        media: avatar,
      }
    },
  },
})