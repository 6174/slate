
export const input = `
one
`.trim()

export const output = {
  kind: 'state',
  document: {
    kind: 'document',
    data: {},
    nodes: [
      {
        kind: 'block',
        type: 'line',
        isVoid: false,
        data: {},
        nodes: [
          {
            kind: 'text',
            leaves: [
              {
                kind: 'leaf',
                text: 'one',
                marks: [],
              }
            ]
          }
        ]
      }
    ]
  }
}

export const options = {
  toJSON: true
}
