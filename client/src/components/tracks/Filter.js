import React from 'react';

const Filter = props => {

  const { filter, setFilter } = props
  return (
    <div className="filter-container">
      <div class="field">
        <div class="control">
          <label class="label">Rank</label>
          <div class="select">
            <select onChange={e => setFilter(e)} name="rank">
              <option value="all" selected>All Ranks</option>
              <option value="white">White</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="brown">Brown</option>
              <option value="black">Black</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Style</label>
          <div class="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">Sort</label>
          <div class="select">
            <select>
              <option>Most Recent</option>
              <option>Most Likes</option>
              <option>Most Completes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter;
