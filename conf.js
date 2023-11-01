jsproxy_config({
  // The currently configured version (recorded in the log, used to check the question)
  // Each modification configuration needs to be increased, otherwise it will not take effect.
  // Automatically download the configuration every 5 minutes by default. If you want to verify immediately, you can access it through the privacy mode.
  ver: '100',

  // pass CDNAccelerate the static resources of commonly used websites (in the experiment)
  static_boost: {
    enable: true,
    ver: 62
  },

  // Node configuration
  node_map: {
   'mysite': {
      label: 'Local',
      lines: {
        [location.host]: 1,
      }
    },
    'geon-fr': {
      label: 'Geonode - France',
      lines: {
        // Host: Weight
        '176.31.182.185:9050': 1,
      }
    },
    'demo-sg': {
      label: 'Demo - Singapore',
      lines: {
        'node-aliyun-sg.etherdream.com:8443': 1,
      }
    },
    // This node is used to load large -volume static resources
    'cfworker': {
      label: '',
      hidden: true,
      lines: {
        // Toll version (high weight)
        'node-cfworker-2.etherdream.com': 4,

        // Free version (low weight, share some costs)
        // There are 100,000 free requests per day per account, but there are frequency restrictions
        'b.007.workers.dev': 1,
        'b.hehe.workers.dev': 1,
        'b.lulu.workers.dev': 1,
        'b.jsproxy.workers.dev': 1,
      }
    }
  },

  /**
   * Default node
   */
  node_default: 'mysite',
  // node_default: /jsproxy-demo\.\w+$/.test(location.host) ? 'demo-hk' : 'mysite',

  /**
   * Acceleration node
   */
  node_acc: 'cfworker',

  /**
   * Static readdressurces CDN address
   * Used to accelerate `assets` Resource access in the directory
   */
  // assets_cdn: 'https://cdn.jsdelivr.net/gh/zjcqoo/zjcqoo.github.io@master/assets/',

  // Open in the local test, otherwise it will be online
  assets_cdn: 'assets/',

  // Homepage
  index_path: 'index_v3.html',

  // Site list supporting CORS (experiment ...)
  direct_host_list: 'cors_v1.txt',

  /**
   * Customize the HTML of the injection page
   */
  inject_html: '<!-- custom html -->',

  /**
   * URL Custom processing (in design)
   */
  url_handler: {
    'https://www.baidu.com/img/baidu_resultlogo@2.png': {
      replace: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
    },
    'https://www.pornhub.com/': {
      redir: 'https://youtu.be/R44L-EovL88'
    },

    'http://haha.com/': {
      content: 'Hello World'
    },
    'http://info/': {
      content: 'This was made by EtherDream on Github, and enhanced and customised by Niko.'
    },
  }
})
