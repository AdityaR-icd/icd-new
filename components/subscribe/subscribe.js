export default function subscribe() {
    return(
        <div>
            <form id="sib-form" className="custom-form" method="POST" action="https://a6f6a24b.sibforms.com/serve/MUIEADiDSmHjT9afNf-PzgCgWsau7TkVZSO86tS2jMasQzX1k-xTv25YrkndeW2CSUQ7-yuvRRJ0uKy-BF3km-KAv5vj1s-Vww4KNEE7N3jzfkzbToN1fn-8C2W0qKvHRMyQsZVB5JVNDs32ERczKkCLMQbAyFD6xSWbUsGW9t7Rejlsrkb1wGyvdX1b8orKjZ7Yr1c1CKjmiktF">
                <span className="footerHead">subscribe to the yellow envelope</span>
                <span className="subscribe__field">
                    <div className="form-group">
                        <input type="email"  placeholder=" " id="EMAIL" name="EMAIL" className="form-control" autoComplete="off" data-required="true" required/>
                        <label className="form-control-placeholder" htmlFor="EMAIL">email *</label>
                    </div>
                    <div className="form-group two-col-field">
                        <input type="text"  placeholder=" " id="FIRSTNAME" name="FIRSTNAME" className="form-control" autoComplete="off" data-required="true" required/>            
                        <label className="form-control-placeholder" htmlFor="FIRSTNAME">first name *</label>
                    </div>
                    <div className="form-group two-col-field">
                        <input type="text"  placeholder=" " id="LASTNAME" name="LASTNAME" className="form-control" autoComplete="off" data-required="true" required/>
                        <label className="form-control-placeholder" htmlFor="LASTNAME">last name *</label>
                    </div>
                </span>  
                <button type="submit" form="sib-form" className="blackBG">subscribe</button>
            </form>
        </div>
    )
}