const sass = require('sass-embedded');
module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    src: 'material-design-icons',
    version: '4.0.0',
    baseClass: 'mi',
    patterns: {
      svg: 'src/**/**/**/24px.svg'
    },
    startCodepoint: 61440, // 61440 = 0xF000, 61697 = 0xF101
    paths: {
      root: '../',
      templates: 'Templates/',
      vendor: 'Vendor/',
      svgSource: '<%= paths.vendor %><%= src %>/',
      target: '<%= paths.root %>Resources/Public/Vendor/material-<%= version %>/'
    },
    styles: {
      materialicons: {
        family: 'Material Icons',
        file: 'materialiconsfilled',
        name: 'filled'
      },
      materialiconsoutlined: {
        family: 'Material Icons Outlined',
        file: 'materialiconsoutlined',
        name: 'outlined'
      },
      materialiconsround: {
        family: 'Material Icons Round',
        file: 'materialiconsround',
        name: 'round'
      },
      materialiconssharp: {
        family: 'Material Icons Sharp',
        file: 'materialiconssharp',
        name: 'sharp'
      },
      materialiconstwotone: {
        family: 'Material Icons Two Tone',
        file: 'materialiconstwotone',
        name: 'twotone'
      }
    },

    // Checkout source icons
    shell: {
      vendor: [
        'git clone --depth 1 --filter=blob:none --no-checkout https://github.com/google/material-design-icons <%= paths.svgSource %>',
        'cd <%= paths.svgSource %>',
        'git sparse-checkout init',
        'git sparse-checkout set src',
        'git checkout master'
      ].join('&&')
    },

    // Minify/optimize icons and copy to them target directory
    imagemin: {
      main: {
        options: {
          optimizationLevel: 3,
          // https://svgo.dev/docs/plugins/
          svgoPlugins: [{
            cleanupListOfValues: true,
          }, {
            // Converting styles such as style="enable-background:new 0 0 24 24", style="fill:none" to attributes
            // allows plugins such as cleanupEnableBackground, removeUselessStrokeAndFill to do further processing
            convertStyleToAttrs: true,
          }, {
            removeOffCanvasPaths: true,
          }, {
            removeRasterImages: true,
          }, {
            removeScriptElement: true,
          }, {
            removeStyleElement: true,
          }, {
            removeUselessStrokeAndFill: {
              removeNone: true, // Remove elements that have computed fill and stroke equal to "none"
            },
          }, {
            removeViewBox: false,
          }, {
            sortAttrs: true,
          }],
        },
        files: [{
          expand: true,
          cwd: '<%= paths.svgSource %>',
          src: '<%= patterns.svg %>',
          filter: 'isFile',
          rename: function (dest, matchedSrcPath) {
            return getTargetFilename(matchedSrcPath);
          },
        }]
      }
    },

    // Create various webfonts from icons
    webfont: {
      options: {
        stylesheet: 'css',
        templateOptions: {
          baseClass: '<%= baseClass %>',
          classPrefix: '<%= baseClass %>-'
        },
        template: '<%= paths.templates %>font.css',
        htmlDemo: false,
        codepointsFile: '<%= paths.target %>metadata/codepoints.json',
        types: 'woff,woff2',
        relativeFontPath: '../webfonts/',
        engine: 'fontforge',
        optimize: false,
        autoHint: true,
        version: '<%= version %>',
      },
      materialicons: {
        src: '<%= paths.target %>svgs/<%= styles.materialicons.name %>/*.svg',
        dest: '<%= paths.target %>webfonts/',
        destCss: '<%= paths.target %>css/',
        options: {
          font: '<%= styles.materialicons.file %>',
          fontFamilyName: '<%= styles.materialicons.family %>',
          fontFilename: '<%= styles.materialicons.file %>'
        }
      },
      materialiconsoutlined: {
        src: '<%= paths.target %>svgs/<%= styles.materialiconsoutlined.name %>/*.svg',
        dest: '<%= paths.target %>webfonts/',
        destCss: '<%= paths.target %>css/',
        options: {
          font: '<%= styles.materialiconsoutlined.file %>',
          fontFamilyName: '<%= styles.materialiconsoutlined.family %>',
          fontFilename: '<%= styles.materialiconsoutlined.file %>'
        }
      },
      materialiconsround: {
        src: '<%= paths.target %>svgs/<%= styles.materialiconsround.name %>/*.svg',
        dest: '<%= paths.target %>webfonts/',
        destCss: '<%= paths.target %>css/',
        options: {
          font: '<%= styles.materialiconsround.file %>',
          fontFamilyName: '<%= styles.materialiconsround.family %>',
          fontFilename: '<%= styles.materialiconsround.file %>'
        }
      },
      materialiconssharp: {
        src: '<%= paths.target %>svgs/<%= styles.materialiconssharp.name %>/*.svg',
        dest: '<%= paths.target %>webfonts/',
        destCss: '<%= paths.target %>css/',
        options: {
          font: '<%= styles.materialiconssharp.file %>',
          fontFamilyName: '<%= styles.materialiconssharp.family %>',
          fontFilename: '<%= styles.materialiconssharp.file %>'
        }
      },
      materialiconstwotone: {
        src: '<%= paths.target %>svgs/<%= styles.materialiconstwotone.name %>/*.svg',
        dest: '<%= paths.target %>webfonts/',
        destCss: '<%= paths.target %>css/',
        options: {
          font: '<%= styles.materialiconstwotone.file %>',
          fontFamilyName: '<%= styles.materialiconstwotone.family %>',
          fontFilename: '<%= styles.materialiconstwotone.file %>'
        }
      }
    },

    svgstore: {
      options: {
        prefix: '',
        formatting: {
          indent_size: 2
        },
        includedemo: false,
        inheritviewbox: true,
        includeTitleElement: false,
        svg: {
          xmlns: 'http://www.w3.org/2000/svg',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink'
        }
      },
      materialicons: {
        files: {
          '<%= paths.target %>sprites/<%= styles.materialicons.file %>.svg': ['<%= paths.target %>svgs/<%= styles.materialicons.name %>/*.svg']
        }
      },
      materialiconsoutlined: {
        files: {
          '<%= paths.target %>sprites/<%= styles.materialiconsoutlined.file %>.svg': ['<%= paths.target %>svgs/<%= styles.materialiconsoutlined.name %>/*.svg']
        }
      },
      materialiconsround: {
        files: {
          '<%= paths.target %>sprites/<%= styles.materialiconsround.file %>.svg': ['<%= paths.target %>svgs/<%= styles.materialiconsround.name %>/*.svg']
        }
      },
      materialiconssharp: {
        files: {
          '<%= paths.target %>sprites/<%= styles.materialiconssharp.file %>.svg': ['<%= paths.target %>svgs/<%= styles.materialiconssharp.name %>/*.svg']
        }
      },
      materialiconstwotone: {
        files: {
          '<%= paths.target %>sprites/<%= styles.materialiconstwotone.file %>.svg': ['<%= paths.target %>svgs/<%= styles.materialiconstwotone.name %>/*.svg']
        }
      }
    },

    // Compile core SCSS
    sass: {
      options: {
        implementation: sass,
        outputStyle: 'expanded',
        precision: 8,
        sourceMap: false,
        silenceDeprecations: [
          'legacy-js-api'
        ]
      },
      main: {
        files: {
          '<%= paths.target %>css/materialicons.css': '<%= paths.target %>scss/materialicons.scss'
        }
      }
    },

    // Minify CSS
    cssmin: {
      options: {
        keepSpecialComments: '*',
        advanced: false
      },
      main: {
        expand: true,
        cwd: '<%= paths.target %>css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= paths.target %>css/',
        ext: '.min.css'
      }
    },

    // Minify SVG Sprites
    xmlmin: {
      main: {
        options: {
          preserveComments: false
        },
        files: [{
          expand: true,
          cwd: '<%= paths.target %>sprites/',
          src: ['*.svg'],
          dest: '<%= paths.target %>sprites/'
        }]
      }
    },

    // Cleanup
    clean: {
      ttf: {
        options: {
          force: true
        },
        src: ['<%= paths.target %>webfonts/*.ttf']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-xmlmin');

  /**
   * Clone icons src
   */
  grunt.registerTask('clone', 'Check if source SVG is present.', function () {
    const svgSource = grunt.config('paths.svgSource') || null;
    grunt.config('paths.sourceJs')
    if (!grunt.file.isDir(svgSource)) {
      grunt.log.writeln('Missing source SVG, cloning...');
      grunt.task.run('shell:vendor');
    } else {
      grunt.log.writeln('Source SVG already present');
    }
  });

  /**
   * Copy scss
   */
  grunt.registerTask('copy', function () {
    grunt.file.copy(
      grunt.config('paths.templates') + 'core.scss',
      grunt.config('paths.target') + 'scss/materialicons.scss'
    );
  });

  /**
   * Create metadata from source icons
   */
  grunt.registerTask('metadata', 'Grunt task to extract metadata from source package.', function () {
    YAML = require('yamljs');

    const svgSource = grunt.config('paths.svgSource');
    const targetPath = grunt.config('paths.target');
    const pattern = grunt.config('patterns.svg');
    const baseClass = grunt.config('baseClass');
    const styles = grunt.config('styles');
    const startCodepoint = grunt.config('startCodepoint');

    let icons = {};
    let categories = {};
    let count = 0;

    grunt.file.expand({
      cwd: svgSource,
      filter: 'isFile',
    }, pattern)
      .forEach(function (sourceFile, index) {
        const style = getStyleFromFilePath(sourceFile);
        const icon = getIconFromFilePath(sourceFile);
        const category = getCategoryFromFilePath(sourceFile);
        const categoryLabel = upperCamelCase(category);

        // Prepare containers & set category
        if (!(category in categories)) {
          categories[category] = {};
        }
        if (!('icons' in categories[category])) {
          categories[category]['icons'] = [];
        }
        if (!(icon in icons)) {
          icons[icon] = {};
        }
        if (!('styles' in icons[icon])) {
          icons[icon]['styles'] = [];
        }

        // Push icons to objects/arrays
        if (!('label' in categories[category])) {
          categories[category]['label'] = categoryLabel;
        }

        if (icons[icon]['styles'].indexOf(styles[style].name) === -1) {
          icons[icon]['styles'].push(styles[style].name);
        }

        if (categories[category]['icons'].indexOf(icon) === -1) {
          categories[category]['icons'].push(icon);
        }

        // Increment count
        count = index + 1;
      });

    // Write metadata
    grunt.file.write(
      targetPath + 'metadata/icons.yml',
      YAML.stringify(icons)
    );
    grunt.file.write(
      targetPath + 'metadata/categories.yml',
      YAML.stringify(categories)
    );

    // Create icon variables for SCSS
    let scssContent = '';
    let codepoints = {};
    let iconVariables = [];
    let iconIdentifier = [];
    Object.keys(icons).sort().forEach(function (icon, index) {
      const codepoint = startCodepoint + index
      codepoints[icon] = codepoint;
      iconVariables.push('$' + baseClass + '-' + icon + ': "\\\\' + codepoint.toString(16) + '";');
      iconIdentifier.push('"' + icon + '": $' + baseClass + '-' + icon + ',');
    });
    scssContent += iconVariables.join('\n') + '\n\n';
    scssContent += '$' + baseClass + '-icons: (\n  ' + iconIdentifier.join('\n  ') + '\n);';

    grunt.file.write(targetPath + 'metadata/codepoints.json', JSON.stringify(codepoints));
    grunt.file.write(targetPath + 'scss/_icons.scss', scssContent);

    grunt.log.write('Processed metadata for ');
    grunt.log.write((count + '').blue);
    grunt.log.writeln(' icons');
  });


  /**
   * Get filename for SVG cleanup
   */
  function getTargetFilename(matchedSrcPath) {
    const targetPath = grunt.config('paths.target');
    const styles = grunt.config('styles');
    const style = getStyleFromFilePath(matchedSrcPath);
    const iconName = getIconFromFilePath(matchedSrcPath);

    const targetFile = targetPath + 'svgs/' + styles[style].name + '/' + iconName + '.svg';
    return targetFile;
  }

  /**
   * Extract icon style from file path
   */
  function getStyleFromFilePath(filePath) {
    return filePath.replace(/src\/[^\/]*\/[^\/]*\/([^\/]*).*/, "$1") ??
      grunt.fail.fatal('Style name could not be extracted from file path!');
  }

  /**
   * Extract icon name from file path
   */
  function getIconFromFilePath(filePath) {
    return filePath.replace(/src\/[^\/]*\/([^\/]*).*/, "$1").replace(/_/g, '-') ??
      grunt.fail.fatal('Icon name could not be extracted from file path!');
  }

  /**
   * Extract category from file path
   */
  function getCategoryFromFilePath(filePath) {
    return filePath.replace(/src\/([^\/]*).*/, "$1") ??
      grunt.fail.fatal('Category name could not be extracted from file path!');
  }

  /**
   * Convert label to UpperCamelCase
   */
  function upperCamelCase(label) {
    return label.replace(/\w+/g, function (w) {
      return w[0].toUpperCase() + w.slice(1).toLowerCase();
    });
  }



  grunt.registerTask('default', ['clone', 'imagemin', 'metadata', 'webfont', 'svgstore', 'xmlmin', 'copy', 'sass', 'cssmin', 'clean']);
  grunt.registerTask('build', ['clone', 'imagemin', 'metadata', 'webfont', 'svgstore', 'xmlmin', 'copy', 'sass', 'cssmin', 'clean']);

  grunt.registerTask('sprites', ['svgstore', 'xmlmin']);
  grunt.registerTask('webfonts', ['webfont', 'copy', 'sass', 'cssmin']);
  grunt.registerTask('css', ['copy', 'sass', 'cssmin']);
};
