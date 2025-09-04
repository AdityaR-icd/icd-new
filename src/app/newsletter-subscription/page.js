// app/newsletters/page.tsx
export const metadata = {
  title: "the yellow envelope",
  description: "",
  keywords: "",
  robots: "index, follow",
  openGraph: {
    title: "the yellow envelope",
    url: "https://www.icdindia.com/newsletter",
    type: "website",
    description: "",
    images: [""], // add OG image URL here
  },
  twitter: {
    card: "",
    title: "the yellow envelope",
    description: "",
    images: [""],
  },
};

export default function NewslettersPage() {
  const myHTML = `
    <!-- Begin Sendinblue Form -->
<!-- START - We recommend to place the below code in head tag of your website html  -->
<link rel="icon" type="image/png" href="http://icdindia.com/favicon.ico">
<link href="https://fonts.googleapis.com/css?family=Merriweather&display=swap" rel="stylesheet">
<style>
  @font-face {
    font-display: block;
    font-family: Roboto;
    src: url(https://assets.sendinblue.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.sendinblue.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff")
  }

  @font-face {
    font-display: fallback;
    font-family: Roboto;
    font-weight: 600;
    src: url(https://assets.sendinblue.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.sendinblue.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff")
  }

  @font-face {
    font-display: fallback;
    font-family: Roboto;
    font-weight: 700;
    src: url(https://assets.sendinblue.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.sendinblue.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff")
  }

  

  #sib-container input:-ms-input-placeholder {
    text-align: left;
    font-family: "Helvetica", sans-serif;
    color: #c0ccda;
    border-width: px;
  }

  #sib-container input::placeholder {
    text-align: left;
    font-family: "Helvetica", sans-serif;
    color: #c0ccda;
    border-width: px;
  }

  #sib-container{
	  padding: 25px 20px 0 !important;
  }

  .sib-form .input{
      border: 0px !important;
      font-family: "TundraOT Light",sans-serif !important;
  }

  .sib-form-block{
	  padding: 0 !important;
  }

  body{
    margin: 0;
    min-height: 100vh;
    background: #FFE300;
  }

  .form-title{
    font-family: "Berthold Akzidenz Grotesk Bold",sans-serif !important;
    font-size:40px;
    line-height: 36px;
    text-align:left;
    font-weight:700;
    color:#171717;
    background-color:transparent;
    border-width:px;
    max-width: 300px;
  }

  .form-title-cont{
    width: 600px;
    clear: both;
    content: "";
    display: table; 
	  margin: 35px auto 25px;
  }

  label.entry__label,
  label.entry__specification{
    font-size: 16px !important;
    letter-spacing: 0 !important;
    font-family: "Berthold Akzidenz Grotesk",sans-serif !important;
    color: #000 !important;
    font-weight: normal !important;
    line-height: normal;
    margin-bottom: 5px !important;
  }

  label.entry__specification{
    font-size: 10px !important;
    letter-spacing: 0.2px !important;
  }

  .subscribe-title p{
    max-width: 440px;
    color: #191919 !important;
    font-size: 26px !important;
    font-weight: 700 !important;
    line-height: 28px !important;
    font-family: "Berthold Akzidenz Grotesk Bold",sans-serif !important;
    letter-spacing: -.04em !important;
    word-spacing: -.04em !important;
  }

  #sib-container input::placeholder,
  #sib-container input::-webkit-input-placeholder ,
  #sib-container input,
  .sib-form-container a{
    font-family: "Berthold Akzidenz Grotesk",sans-serif;
    font-weight: 400 !important;
  }

  .entry__field{
    border-radius: 0 !important;
  }

  label.entry__error{
    font-family: "Berthold Akzidenz Grotesk",sans-serif;
    font-size: 10px !important;
    letter-spacing: 0.2px !important;
    width: 100%;
    max-width: inherit;
  }

  .sib-form-container a{
    font-size: 12px !important;
    color: #000 !important;
  }

  button{
    background-color: transparent !important;
    text-transform: uppercase  !important;
    letter-spacing: 1px !important;
    text-align: center !important;
    margin: 15px auto 0 !important;
    width: 138px !important;
    border: 1px solid #e5e5e5 !important;
    padding: 6px 15px !important;
    -webkit-transition: .3s !important;
    -moz-transition: .3s !important;
    -o-transition: .3s !important;
    transition: .3s !important;
    border: 1px solid #8c8c8c !important;
    color: #8c8c8c !important;
    text-decoration: none !important;
    border-radius: 0 !important;
    cursor: pointer;
    font-size: 16px !important;
    letter-spacing: -.37px !important;
    line-height: 21px !important;
    text-align: center !important;
    text-transform: lowercase !important;
  }

    footer{
      display: none !important;
    }

  button:hover{
    background-color: #000 !important;
    color: #fff !important;
  }

  .sib-form-block__button-with-loader{
    position: relative;
  }

  .progress-indicator__icon{
    position: absolute;
    right: -55px;
  }

  .sib-form{
    padding: 100px 0 0 !important;
  }

  #error-message{
    display: none !important;
  }

  @media (max-width: 767px){
      .form-title-cont{
        margin: 35px auto 25px 5px !important;
        width: auto;
      }
      #sib-container{
        padding: 25px 15px 0 !important;
      }
  }



</style>
<link rel="stylesheet" href="https://assets.sendinblue.com/component/form/2ef8d8058c0694a305b0.css">
<link rel="stylesheet" href="https://assets.sendinblue.com/component/clickable/b056d6397f4ba3108595.css">
<link rel="stylesheet" href="https://assets.sendinblue.com/component/progress-indicator/f86d65a4a9331c5e2851.css">
<link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css">
<!--  END - We recommend to place the above code in head tag of your website html -->

<!-- START - We recommend to place the below code where you want the form in your website html  -->
<div class="sib-form" style="text-align: center;
         background-color: #FFE300;                                 ">
  <div id="sib-form-container" class="sib-form-container">
    <div id="error-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-width:px; border-color:#ff4949;max-width:600px; border-width:px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
          />
        </svg>
        <span class="sib-form-message-panel__inner-text">
                          Your subscription could not be saved. Please try again.
                      </span>
      </div>
    </div>
    <div></div>
    <div id="success-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#085229; background-color:#e7faf0; border-radius:3px; border-width:px; border-color:#13ce66;max-width:600px; border-width:px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
          />
        </svg>
        <span class="sib-form-message-panel__inner-text">
                          Thanks for subscribing to the yellow envelope 
                      </span>
      </div>
    </div>
    <div class="form-title-cont">
		<div style="padding: 0 10px; float: left;">
			<div class="form-title">
				the yellow envelope
			</div>
		</div>
	</div>
    <div id="sib-container" class="sib-container--large sib-container--vertical" style="text-align:center; background-color:rgba(255,255,255,1); max-width:600px;">
      <form id="sib-form" method="POST" action="https://a6f6a24b.sibforms.com/serve/MUIEAN-U3fxaab-JknIBPU7VUCRHb4rydLWi1kD_HF7fDPlY53FJTaXtzL4t4_Wy8zrIbSB5bR6r3B4VUWTAwyw7J166dIyV8kG0ZyXMxDy3SR05vpIMklK6iPfAFqCzOf0iPTyHIeHyfHbDMly3pJKgtT6yGTY0o0ygFVGunVGDBWmkWuzyZc7V-MbzE_ELDMOyvd4zw0a-IG4e"
        data-type="subscription">
        <div style="padding: 20px 0;">
          <div class="sib-form-block" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#3C4858; background-color:transparent; border-width:px;">
            <div class="sib-text-form-block subscribe-title">
              <p>subscribe to the yellow envelope and stay updated.</p>
            </div>
          </div>
        </div>
        <div style="padding: 20px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <label class="entry__label" style="font-size:16px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#3c4858; border-width:px;" for="FIRSTNAME" data-required="*">
                  enter your first name
                </label>

                <div class="entry__field">
                  <input class="input" maxlength="200" type="text" id="FIRSTNAME" name="FIRSTNAME" autocomplete="off" placeholder="first name" data-required="true" required />
                </div>
              </div>

              <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-width:px; border-color:#ff4949;">
              </label>
              <!-- <label class="entry__specification" style="font-size:12px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#8390A4; border-width:px;">
                Customize this optional help text before publishing your form.
              </label> -->
            </div>
          </div>
        </div>
        <div style="padding: 20px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <label class="entry__label" style="font-size:16px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#3c4858; border-width:px;" for="LASTNAME" data-required="*">
                  enter your last name
                </label>

                <div class="entry__field">
                  <input class="input" maxlength="200" type="text" id="LASTNAME" name="LASTNAME" autocomplete="off" placeholder="last name" data-required="true" required />
                </div>
              </div>

              <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-width:px; border-color:#ff4949;">
              </label>
              <!-- <label class="entry__specification" style="font-size:12px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#8390A4; border-width:px;">
                Customize this optional help text before publishing your form.
              </label> -->
            </div>
          </div>
        </div>
        <div style="padding: 20px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <label class="entry__label" style="font-size:16px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#3c4858; border-width:px;" for="EMAIL" data-required="*">
                  enter your email address to subscribe
                </label>

                <div class="entry__field">
                  <input class="input" type="text" id="EMAIL" name="EMAIL" autocomplete="off" placeholder="email" data-required="true" required />
                </div>
              </div>

              <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-width:px; border-color:#ff4949;">
              </label>
              <label class="entry__specification" style="font-size:12px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#8390A4; border-width:px;">
                provide your email address to subscribe. For e.g abc@xyz.com
              </label>
            </div>
          </div>
        </div>
        <div style="padding: 20px 0;">
          <div class="sib-form-block" style="text-align: right">
            <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-size:16px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#FFFFFF; background-color:#3E4857; border-radius:3px; border-width:0px;"
              form="sib-form" type="submit">
              <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
                <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                />
              </svg>
              SUBSCRIBE
            </button>
          </div>
        </div>
        <div style="padding: 20px 0 10px;">
          <div class="sib-form-block" style="font-size:14px; text-align:center; font-family:&quot;Helvetica&quot;, sans-serif; color:#333; background-color:transparent; border-width:px;">
            <div class="sib-text-form-block">
              <p>
                <a href="https://www.sendinblue.com/legal/privacypolicy/" target="_blank">Terms &amp; Privacy policy</a>
              </p>
            </div>
          </div>
        </div>

        <input type="text" name="email_address_check" value="" class="input--hidden">
        <input type="hidden" name="locale" value="en">
      </form>
    </div>
  </div>
</div>
<!-- END - We recommend to place the below code where you want the form in your website html  -->

<!-- START - We recommend to place the below code in footer or bottom of your website html  -->
<script>
  window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';

  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "The email provided is invalid.";

  window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";

  window.GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";




  window.translation = {
    common: {
      selectedList: '{quantity} list selected',
      selectedLists: '{quantity} lists selected'
    }
  };

  var AUTOHIDE = Boolean(1);
</script>
<script src="https://sibforms.com/forms/end-form/build/main.js">
</script>
<script src="https://www.google.com/recaptcha/api.js?hl=en"></script>
<!-- END - We recommend to place the above code in footer or bottom of your website html  -->
<!-- End Sendinblue Form --></div>`;
  return <div dangerouslySetInnerHTML={{ __html: myHTML }} />;
}
