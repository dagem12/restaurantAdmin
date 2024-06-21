export default function buildPaginationQueryOpts(paginationQuery, reqFilter) {
    const params = new URLSearchParams();
  
    // Add custom filter parameters
    if (reqFilter) {
      for (const key in reqFilter) {
        params.append(key, reqFilter[key]);
      }
    }
  
    // Add pagination parameters
    if (paginationQuery) {
      params.append('page', paginationQuery.page.toString());
      params.append('size', paginationQuery.size.toString());
      if (paginationQuery.sort) {
        for (const sort of paginationQuery.sort) {
          params.append('sort', sort);
        }
      }
    }
  
    return params.toString();
  }
  