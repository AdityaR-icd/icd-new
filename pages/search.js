import { useEffect, useState } from 'react';
import {isEmpty} from 'lodash';

import Router from 'next/router';

import { handleRedirectsAndReturnData } from '../components/slug';
import SearchBox from '../components/search-box';


export default function Search( { data } ) {
  const searchQueryString = process.browser ? ( Router?.query?.s ?? '' ) : '';
  const [ searchQuery, setSearchQuery ] = useState( searchQueryString );
  const [ showResultInfo, setShowResultInfo ] = useState( false );
  const [ searchError, setSearchError ] = useState( '' );
  const handleSearchFormSubmit = ( event ) => {

    event.preventDefault();
    setShowResultInfo( false );

    if ( isEmpty( searchQuery ) ) {
      setSearchError( 'Please enter text to search' );
      setQueryResultPosts( {} );
      return null;
    }

    setSearchError( '' );

    fetchPosts( {
      variables: {
        first: PER_PAGE_FIRST,
        after: null,
        query: searchQuery
      }
    } );
  };
  return (
    <>
      <div className="mx-auto min-h-almost-screen">
        <SearchBox
          searchQuery={ searchQuery }
          setSearchQuery={ setSearchQuery }
          handleSearchFormSubmit={handleSearchFormSubmit}
        />
      </div>
    </>
  );
}
