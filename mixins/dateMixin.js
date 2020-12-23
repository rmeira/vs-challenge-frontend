import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

export const dateMixin = {
  methods: {
    formatDateDistance(date) {
      return formatDistanceToNow(new Date(date ? date : null), {
        addSuffix: false,
        includeSeconds: false,
        locale: ptBR,
      })
    },
  },
}
