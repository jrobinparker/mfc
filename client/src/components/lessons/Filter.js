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
              <option value="" selected>all</option>
              <option>white</option>
              <option>yellow</option>
              <option>green</option>
              <option>blue</option>
              <option>purple</option>
              <option>brown</option>
              <option>black</option>
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
