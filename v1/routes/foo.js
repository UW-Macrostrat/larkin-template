module.exports = {
  path: '/foo',
  description: 'An example route',
  requiredParameters: [],
  requiresOneOf: ['thing'],
  parameters: {
    'thing': {
      'type': 'text[]',
      'description': 'Just a thing. Can be more than one thing'
    },
    'format': {
      'type': 'text',
      'description': 'Desired output format',
      'values': [ 'json', 'csv' ]
    }
  },
  fields: {
    'message': {
      'type': 'text',
      'description': 'A message'
    }
  },
  examples: [
    '/api/foo'
  ],
  handler: (req, res, next) => {
    res.reply(req, res, next, [{"message": `Can you hear me? You provided the following values to the parameter 'thing' - ${req.query.thing.split(',')}`}])
  }
}
