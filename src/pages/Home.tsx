import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import allWebtoonData from '../data'
import './Table.css'
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg'
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg'
import { ReactComponent as CaretIcon } from '../icons/caret.svg'

function parseStringWithMillionsAndBillions(str) {
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
  const [displayMetrics, setDisplayMetrics] = useState(true)
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
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            displayMetrics={displayMetrics}
            setDisplayMetrics={setDisplayMetrics}
          ></DropdownMenu>
        </NavItem>
      </Navbar>
      <div className='photo-grid'>
        {sortedWebtoonData.map((webtoon, index) => {
          return (
            <a
              href={webtoon.url}
              key={webtoon.title}
              target='_blank'
              rel='noreferrer noopener'
            >
              <div
                className='card'
                style={{ backgroundImage: `url(${webtoon.img_url})` }}
              >
                {displayMetrics && (
                  <>
                    <div className='card-rank'>{index + 1}</div>
                    <div className='metrics'>{`⭐ ${webtoon.rating} 👀 ${webtoon.views_count} ✅ ${webtoon.subscribed_count}`}</div>
                  </>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}

function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>{props.children}</ul>
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false)

  return (
    <li className='nav-item'>
      <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu({
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  displayMetrics,
  setDisplayMetrics,
}) {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        href='#'
        className='menu-item'
        style={{
          ...((props.sort === sortBy || props.filter === filterBy) && {
            color: 'red',
          }),
        }}
        onClick={() => {
          if (props.goToMenu) {
            setActiveMenu(props.goToMenu)
          }
          if (props.sort) {
            setSortBy(props.sort)
          }
          if (props.filter) {
            setFilterBy(props.filter)
          }
          if (props.displayMetrics) {
            setDisplayMetrics(!displayMetrics)
          }
        }}
      >
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className='dropdown' style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames='menu-primary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem
            leftIcon={<ChevronIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu='Sort'
          >
            Sort
          </DropdownItem>
          <DropdownItem
            leftIcon={<ChevronIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu='Filter'
          >
            Filter
          </DropdownItem>
          <DropdownItem leftIcon='👀' displayMetrics='true'>
            Toggle Metrics
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Sort'}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<ArrowIcon />}>
            <h2>Metrics</h2>
          </DropdownItem>
          <DropdownItem sort='rating' leftIcon='⭐'>
            Ratings
          </DropdownItem>
          <DropdownItem sort='views_count' leftIcon='👀'>
            Views
          </DropdownItem>
          <DropdownItem sort='subscribed_count' leftIcon='✅'>
            Subscribed
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Filter'}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<ArrowIcon />}>
            <h2>Genres</h2>
          </DropdownItem>
          <DropdownItem filter='all' leftIcon='❤️'>
            All
          </DropdownItem>
          <DropdownItem filter='Drama' leftIcon='🎭'>
            Drama
          </DropdownItem>
          <DropdownItem filter='Action' leftIcon='🎬'>
            Action
          </DropdownItem>
          <DropdownItem filter='Sports' leftIcon='🏆'>
            Sports
          </DropdownItem>
          <DropdownItem filter='Fantasy' leftIcon='🐲'>
            Fantasy
          </DropdownItem>
          <DropdownItem filter='Romance' leftIcon='💌'>
            Romance
          </DropdownItem>
          <DropdownItem filter='Thriller' leftIcon='🔥'>
            Thriller
          </DropdownItem>
          <DropdownItem filter='Horror' leftIcon='😱'>
            Horror
          </DropdownItem>
          <DropdownItem filter='Supernatural' leftIcon='🛸'>
            Supernatural
          </DropdownItem>
          <DropdownItem filter='Sci-fi' leftIcon='🛸'>
            Sci-fi
          </DropdownItem>
          <DropdownItem filter='Comedy' leftIcon='😂'>
            Comedy
          </DropdownItem>
          <DropdownItem filter='Slice of life' leftIcon='🍰'>
            Slice of life
          </DropdownItem>
          <DropdownItem filter='Historical' leftIcon='📜'>
            Historical
          </DropdownItem>
          <DropdownItem filter='Superhero' leftIcon='🦸'>
            Superhero
          </DropdownItem>
          <DropdownItem filter='Informative' leftIcon='📚'>
            Informative
          </DropdownItem>
          <DropdownItem filter='Heartwarming' leftIcon='☀️'>
            Heartwarming
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Home
