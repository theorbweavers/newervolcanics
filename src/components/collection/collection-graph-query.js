export default (collectionQuery = (collectionName, collectionQuery) => {
  return `
		query ${collectionName} {
			${collectionQuery} {
				edges {
					node {
						id
						slug
					}
				}
			}
		}
	`
})
