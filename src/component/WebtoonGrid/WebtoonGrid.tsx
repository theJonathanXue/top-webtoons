import React from 'react'
import './WebtoonGrid.css'

function WebtoonGrid({ sortedWebtoonData, displayMetrics }) {
  return (
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
  )
}

export default WebtoonGrid
