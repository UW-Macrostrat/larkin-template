module.exports = {
  path: '/lithologies',
  description: 'An example route',
  parameters: {
    'lith_id': {
      'type': 'integer[]',
      'description': 'A valid lithology identifier'
    },
    'format': {
      'type': 'text',
      'description': 'The desired output format',
      'values': [ 'json', 'csv' ]
    }
  },
  requiredParameters: [],
  requiresOneOf: [ 'lith_id' ],
  fields: {
    'lith_id': {
      'type': 'integer',
      'description': 'The unique lithology identifier'
    },
    'lith': {
      'type': 'text',
      'description': 'The name of the lithology'
    },
    'lith_group': {
      'type': 'text',
      'description': 'The group of lithologies the given lithology belongs to'
    },
    'lith_type': {
      'type': 'text',
      'description': 'The type of lithologies the given lithology belongs to'
    },
    'lith_class': {
      'type': 'text',
      'description': 'The class of lithologies the given lithology belongs to'
    },
    'lith_color': {
      'type': 'text',
      'description': 'A hexidecimal color code that can be used to style the output'
    },
  },
  examples: [
    '/api/foo?lith_id=86,91,24'
  ],
  // Note the addition of plugins
  handler: (req, res, next, plugins) => {
    let where = []
    let params = []

    if (req.query.lith_id) {
      where.push(`id = ANY($${where.length + 1})`)
      params.push(req.query.lith_id)
    }

    if (where.length) {
      where = `WHERE ${where.join(' AND ')}`
    }

    plugins.pg.query(`
      SELECT
        id AS lith_id,
        lith,
        lith_group,
        lith_type,
        lith_class,
        lith_color
      FROM macrostrat.liths
      ${where}
    `, params, (error, result) => {
      if (error) {
        return res.error(req, res, next)
      }
      res.reply(req, res, next, result)
    })
  }
}
