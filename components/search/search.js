export default function search(){
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <form className="global-search">
                    <div role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded="false" className="react-autosuggest__container">
                        <input type="search" autoComplete="off" aria-autocomplete="list" aria-controls="react-autowhatever-1" className="searchInput" placeholder="type an industry, client or keyword" id="g-search" required="" name="search" role="searchbox" />
                    </div>
                        <label htmlFor="g-search" className="search-label">Search</label>
                        <input className="searchBtn" type="submit" value="" />
                    </form>
                </div>
            </div>
        </div>
    )
}