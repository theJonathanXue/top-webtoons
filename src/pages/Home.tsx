import React, { useState, useEffect } from 'react'
import allWebtoonData from '../data'
import { ReactComponent as CaretIcon } from '../icons/caret.svg'
import DropdownMenu from '../component/DropdownMenu/DropdownMenu'
import Navbar from '../component/Navbar/Navbar'
import NavItemButton from '../component/NavItemButton/NavItemButton'
import WebtoonGrid from '../component/WebtoonGrid/WebtoonGrid'
import './Home.css'

const parseStringWithMillionsAndBillions = (str) => {
  // Remove all commas from the string
  str = str.replace(/,/g, '')

  // Check if the string contains the "M" symbol
  if (str.indexOf('M') > -1) {
    // If it does, remove the "M" symbol and multiply the number by 1 million
    str = str.replace('M', '')
    return parseFloat(str) * 1000000
  } else if (str.indexOf('B') > -1) {
    // If it contains the "B" symbol, remove it and multiply the number by 1 billion
    str = str.replace('B', '')
    return parseFloat(str) * 1000000000
  } else {
    // If it doesn't contain either symbol, just parse the string as an integer
    return parseFloat(str)
  }
}

function Home() {
  const [sortBy, setSortBy] = useState('rating')
  const [filterBy, setFilterBy] = useState('all')
  const [displayMetrics, setDisplayMetrics] = useState(false)
  const [sortedWebtoonData, setSortedWebtoonData] = useState(
    allWebtoonData.sort(sortByField)
  )

  // function for sorting by selected fields
  function sortByField(webtoon1, webtoon2) {
    // sort by views or subscribed
    if (sortBy !== 'rating') {
      if (
        parseStringWithMillionsAndBillions(webtoon2[sortBy]) >
        parseStringWithMillionsAndBillions(webtoon1[sortBy])
      ) {
        return 1
      }
      if (
        parseStringWithMillionsAndBillions(webtoon2[sortBy]) <
        parseStringWithMillionsAndBillions(webtoon1[sortBy])
      ) {
        return -1
      }
    }

    // sort by rating
    if (parseFloat(webtoon2.rating) > parseFloat(webtoon1.rating)) {
      return 1
    }
    if (parseFloat(webtoon2.rating) < parseFloat(webtoon1.rating)) {
      return -1
    }

    // if ratings are equal, sort by subscribed
    if (
      parseStringWithMillionsAndBillions(webtoon2.subscribed_count) >
      parseStringWithMillionsAndBillions(webtoon1.subscribed_count)
    ) {
      return 1
    }
    if (
      parseStringWithMillionsAndBillions(webtoon2.subscribed_count) <
      parseStringWithMillionsAndBillions(webtoon1.subscribed_count)
    ) {
      return -1
    }
    return 0
  }

  useEffect(() => {
    let filteredWebtoons = allWebtoonData.sort(sortByField)
    if (filterBy !== 'all') {
      filteredWebtoons = filteredWebtoons.filter(
        (webtoon) => webtoon.genre === filterBy
      )
    }
    setSortedWebtoonData(filteredWebtoons.sort(sortByField))
  }, [sortBy, filterBy])

  return (
    <>
      <Navbar>
        <div className='navbar-brand'>
          <a href='https://www.webtoons.com/en/'>
            <img
              className='logo'
              src='https://upload.wikimedia.org/wikipedia/commons/0/09/Naver_Line_Webtoon_logo.png'
              alt='webtoon logo'
            />
          </a>
          Top Webtoons
        </div>
        <NavItemButton icon={<CaretIcon />}>
          <DropdownMenu
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            displayMetrics={displayMetrics}
            setDisplayMetrics={setDisplayMetrics}
          ></DropdownMenu>
        </NavItemButton>
      </Navbar>
      <WebtoonGrid
        sortedWebtoonData={sortedWebtoonData}
        displayMetrics={displayMetrics}
      ></WebtoonGrid>
    </>
  )
}

export default Home
