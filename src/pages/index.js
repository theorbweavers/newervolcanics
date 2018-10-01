import React from 'react';

import Layout from '../components/layout';
import Article from '../components/article';

const IndexPage = () => (
  <Layout>
    <Article>
      <h1>Welcome</h1>
      <p>
        Newer Volcanics is a creative project responding to the volcanic plains
        and waterways of western Melbourne. Using psychogeography to explore the
        confluence of the Maribyrnong and Birrarung (Yarra) Rivers, travelling
        south west to Skeleton Creek, Newer Volcanics reflects on geology,
        industrial history and environmental change through song, spoken word
        and visuals.
      </p>
      <p>
        A limbic interpretation of landscape, Newer Volcanics is created from
        research undertaken by The Orbweavers as Creative Fellows at State
        Library of Victoria.
      </p>
    </Article>
  </Layout>
);

export default IndexPage;
