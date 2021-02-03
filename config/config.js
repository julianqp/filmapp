const config = {
  posterUrl: 'https://image.tmdb.org/t/p/w500',
  urlApi: 'https://julfilmapi.herokuapp.com/',
  iva: 10,
  payments: [{ name: 'Stripe', slug: 'stripe' }],
  stripe: ['partial-refund', 'refund'],
  status: {
    paid: 'Pagado',
    pending: 'Pendiente',
    canceled: 'Cancelado',
    refunded: 'Re-embolsado',
    'pending-refund': 'Pendiente de reembolso',
    created: 'Creado',
  },
  stripe_pk:
    'pk_test_51ICV1wExuTQ9uME19qATS72HbNPsWtrHayFDDJoV2elMeYfyPl7QxLap3THNzTYFjGwLkXA7uh3FxGosQbdSt46000LKQEAfXu',
}

export default config
