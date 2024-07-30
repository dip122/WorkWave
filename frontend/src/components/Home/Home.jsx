import React from 'react'
import HeroPart from './HeroPart';
import Services from './Services';
import JobCategories from './JobCategories';
import Companiespopular from './Companiespopular';
import Header from '../Layout/Header';

const Home = () => {
  return (
    <section>
      <Header/>
      <HeroPart/>
      <Services/>
      <JobCategories/>
      <Companiespopular/>
    </section>
  )
}

export default Home