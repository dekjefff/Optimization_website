// obtain plugin
var cc = initCookieConsent();

// run plugin with your configuration
// example please see: https://orestbida.com/demo-projects/cookieconsent/
cc.run({
  current_lang: 'th',
  autoclear_cookies: true, // default: false
  page_scripts: true, // default: false

  // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
  // delay: 0,                               // default: 0
  // auto_language: null                     // default: null; could also be 'browser' or 'document'
  // autorun: true,                          // default: true
  // force_consent: false,                   // default: false
  // hide_from_bots: false,                  // default: false
  // remove_cookie_tables: false             // default: false
  // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
  // cookie_expiration: 182,                 // default: 182 (days)
  // cookie_necessary_only_expiration: 182   // default: disabled
  // cookie_domain: location.hostname,       // default: current domain
  // cookie_path: '/',                       // default: root
  // cookie_same_site: 'Lax',                // default: 'Lax'
  // use_rfc_cookie: false,                  // default: false
  // revision: 0,                            // default: 0

  gui_options: {
    consent_modal: {
      layout: 'cloud', // box/cloud/bar
      position: 'bottom center', // bottom/middle/top + left/right/center
      transition: 'slide', // zoom/slide
      swap_buttons: false, // enable to invert buttons
    },
    settings_modal: {
      layout: 'box', // box/bar
      position: 'left', // left/right
      transition: 'slide', // zoom/slide
    },
  },

  onFirstAction: function (
    user_preferences,
    cookie,
  ) {
    // callback triggered only once
    typeof window.setJsonCookie === 'function' &&
      window.setJsonCookie();
  },

  onAccept: function (cookie) {
    // START OnAccept
    if (!cc.allowedCategory('analytics')) {
      document.cookie = `_gat_gtag_UA_7712859_1=; path=/; domain=${location.hostname}; expires=' + ${new Date(0).toUTCString()}`;
      document.cookie = `_gid=; path=/; domain=${location.hostname}; expires=' + ${new Date(0).toUTCString()}`;
      document.cookie = `_ga=; path=/; domain=${location.hostname}; expires=' + ${new Date(0).toUTCString()}`;
    
    }
    // END OnAccept

    typeof window.setJsonCookie === 'function' &&
      window.setJsonCookie();
  },

  onChange: function (
    cookie,
    changed_preferences,
  ) {
    // ...

    // START OnChange
    if (!cc.allowedCategory('analytics')) {
      sessionStorage.removeItem('_gat_gtag_UA_7712859_1');      
      sessionStorage.removeItem('_gid');
      sessionStorage.removeItem('_ga'); 
     
    

    }
    // END OnChange

    typeof window.setJsonCookie === 'function' &&
      window.setJsonCookie();
  },

  languages: {
    th: {
      consent_modal: {
        title: 'Cookie consent',
        
        description:
          'Our website uses cookies to provide you with a better online experience. Please select “Accept” or “Cookie Settings” to set your cookie preferences.  <button type="button" data-cc="c-settings" class="cc-link">Cookie settings</button>',
        primary_btn: {
          text: 'Accept all',
          role: 'accept_all', // 'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: 'Reject all',
          role: 'accept_necessary', // 'settings' or 'accept_necessary'
        },
      },
      settings_modal: {
        title: 'Cookie management',
        save_settings_btn: 'Save settings',
        accept_all_btn: 'Accept all',
        reject_all_btn: 'Reject all',
        close_btn_label: 'Close',
        cookie_table_headers: [
          { col1: 'Name' },
          { col2: 'Domain' },
          { col3: 'Expiration' },
          { col4: 'Description' },
        ],
        blocks: [
          {
            title: 'Cookie usage 📢',
            description:
              'Cookies are used on our website to recognize you from other visitors. Our website uses cookies to analyze how users interact with our website. By continuing to use our website, you consent to us placing cookies on your computer to analyze how users interact with our website. The university will use the analytics to improve the website usability. Performance cookies, on the other hand, do not gather information that can be used to identify you, such as your name, email address, or other personal information. They are only used for statistics purposes. As a result, this privacy policy will help the university to improve our website while simultaneously providing the best possible online experience. Please note that you can modify your cookie settings.',
          },
          {
            title: 'Strictly necessary cookies',
            description:
              'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
            toggle: {
              value: 'necessary',
              enabled: true,
              readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
            },
            
          },
          {
            title: 'Performance and Analytics cookies',
            description:
              'Analytics cookies or performance cookies are used solely for statistical purposes. Analytics cookies allow us to measure the number of visitors, how they use it, and how well it performs. Analytics cookies will allow us to improve the Faculty of Nursing website. ',
            toggle: {
              value: 'analytics', // your cookie category
              enabled: false,
              readonly: false,
            },
            cookie_table: [
              // list of all expected cookies
              {
                col1: 'CONSENT',
                col2: '.google.com',
                col3: '2 years',
                col4: `YouTube sets this cookie via embedded youtube-videos and registers anonymous statistical data.`,
              },
              {
                col1: '_ga', // match all cookies starting with "_ga"
                col2: 'mahidol.ac.th',
                col3: '2 years',
                col4: `The _ga cookie, installed by Google Analytics, calculates visitor, session and campaign data and also keeps track of site usage for the site's analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognize unique visitors.`,
                is_regex: true,
              },
              {
                col1: '_gid',
                col2: 'mahidol.ac.th',
                col3: '1 day',
                col4: `Installed by Google Analytics, _gid cookie stores information on how visitors use a website, while also creating an analytics report of the website's performance. Some of the data that are collected include the number of visitors, their source, and the pages they visit anonymously.`,
              },
              {
                col1: '_gat_gtag_UA_7712859_1',
                col2: 'mahidol.ac.th',
                col3: '1 minute',
                col4: `A variation of the _gat cookie set by Google Analytics and Google Tag Manager to allow website owners to track visitor behaviour and measure site performance. The pattern element in the name contains the unique identity number of the account or website it relates to.`,
              },



            ],
          },


          
          
        ],
      },
    },
  },
});
