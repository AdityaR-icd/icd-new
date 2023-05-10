import { useRouter } from 'next/router'
import { useState } from 'react'
import Autosuggest from 'react-autosuggest';


export default function search({ suggestion }){
     const router = useRouter()
    // Search Result Handler

    const handleSearch =  (event)  => {
        event.preventDefault();
        var search = document.getElementById('g-search').value;
        var clean = '/search/'+ search;
        router.push({
            pathname: clean,
        })
    }

    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([])

    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = value => {
        const inputValue = value?.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : suggestion.filter(suggestion =>
            suggestion.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const getSuggestionValue = suggestion => suggestion;

    const renderSuggestion = suggestion => (
        <div>
          {suggestion}
        </div>
    );


    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onChange = (event , { newValue }) => {
        setValue(newValue)
    };


    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    // const getSuggestionValue = () =>{
    //     setValue(getSuggestions(value))
    // }



    const inputProps = {
        placeholder: 'type an industry, client or keyword',
        value,
        onChange: onChange,
        className: 'searchInput',
        id:"g-search",
        required: true,
        type:"search",
        name:"search",
        role:"searchbox"
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <form className="global-search" onSubmit={handleSearch}>
                    <Autosuggest 
                        suggestions={suggestions} 
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        
                    />
                    {/* <div role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded="false" className="react-autosuggest__container">
                        <input type="search" autoComplete="off" aria-autocomplete="list" aria-controls="react-autowhatever-1" className="searchInput" value={value} onChange={(e) => setValue(e.target.value)} placeholder="type an industry, client or keyword" id="g-search" required="" name="search" role="searchbox" />
                    </div> */}
                        <label htmlFor="g-search" className="search-label">Search</label>
                        <input className="searchBtn" type="submit" value=""  />
                    </form>
                </div>
            </div>
        </div>
    )
}