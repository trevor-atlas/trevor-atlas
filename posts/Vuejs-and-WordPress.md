---
title: Vue.js and WordPress
date: '2016-11-06'
path: blog/vue-wordpress
banner: /images/vue.png
tags:
  - javascript
  - wordpress
draft: true
---

I recently had the opportunity to use Vue.js in one of the backend WordPress plugins I was creating. I've used both React and Angular in past projects but I wanted something lightweight and quick to set up and use, Vue seemed like the perfect tool for the job.

This plugin was being created to make it easier for content and SEO team members to view information about different posts/pages in the back-end of WordPress. They needed to be able to see the ID, Slug and Title of each post on the site and quickly sort through them. The default WordPress admin view for pages is incredibly slow and the search is not very accurate so I set out to improve it.

To start out, I get the plugin initialized by adding our admin page. It's important to namespace our plugin as well to prevent global scope pollution.

```php
<?php namespace PageInfo;

// We can pass add_action a closure instead of passing it a function name.
add_action('admin_menu', function() {
  add_menu_page(
    'All of the pageinfo',
    'Pageinfo',
    'edit_pages',
    'pageinfo',
    __NAMESPACE__.'\\createAdminPage',
    'dashicons-clipboard',
    6);
});
```

*read more about what [add_menu_page()](https://developer.wordpress.org/reference/functions/add_menu_page/) does.*

This will create our page in the backend of WordPress and adds a link to it in the admin sidebar. Anyone with permission to edit pages can access it.

Next, we need to set up the "createAdminPage()" function. We'll use it to build the content of our page. To start with, we need to make a new WP_Query that will grab all of the posts and pages on the site.

(In the future, I may just use the WordPress REST api to do this, since it saves a step.)

```php
function createAdminPage() {
  ?><div class="wrap"><?php

    /**
    * This queries WordPress for every page and post.
    * We need to use a '\' before WP_Query to tell php to use the global namespace, since that function does not exist in this scope.
    */
    $pageInfo = new \WP_Query([
      'post_type' => [
        'post',
        'page'
      ],
      'posts_per_page' => -1,
      'orderby' => 'ID',
      'order' => 'ASC'
    ]);
```

*read more about [namespaces](http://www.phptherightway.com/#namespaces)*

Now that we have that, we can create a new javascript object that contains all of those post's data and get our Vue object initialized.

```php

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.min.js"></script>

<script>
new Vue({
  el: '#pageInfo',
  computed: {
    filteredPages: function () {
      return this.pages.filter(function(item){
        return item.url.indexOf(this.searchQuery) > -1;
      }.bind(this));
    }
  },
  data: {
    searchQuery: '',
    pages: [
      <?php if ($pageInfo->have_posts()): while($pageInfo->have_posts()):
        $pageInfo->the_post();
        $url = parse_url(get_the_permalink());
        ?>
        {
          url: '<?php echo $url['path']; ?>',
          id: '<?php the_ID(); ?>',
          title: '<?php the_title(); ?>',
        },
        <?php endwhile; endif; ?>
      ]
    }
  });
  </script>
```

With this we can construct our view layout in html with Vue tags.

```html
<div id="pageInfo" style="margin: 0 auto;width: 80%; max-width: 1024px;">

  <h1>Pages &amp; Posts</h1>
  <p><small><em>
    This page shows all of the existing posts and pages in an easy to read format. You can also filter by the page url.
  </em></small></p>

  <strong><label for="search">Filter</label></strong>
  <input v-model="searchQuery" name="search">
  <h2 v-if="!filteredPages.length">No results, sorry</h2>
  <p>{{ filteredPages.length }} result(s)</p>
  <table style="margin: 2em 0;" cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th><strong>TITLE</strong></th>
        <th><strong>URL</strong></th>
        <th><strong>ID</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="page in filteredPages">
        <td v-html="page.title"></td>
        <td><a v-bind:href="page.url">{{ page.url.slice(1).length > 0 ? page.url.slice(1) : "home" }}</a></td>
        <td>{{ page.id }}</td>
      </tr>
    </tbody>
  </table>
</div>
```

Add it all together, and you get something like this (I've added a few css styles to clean it up)

{% gist 44604a5a3aa63acef155cda7647ddbea pageinfo.php %}

You can drop this plugin file into the wp-content/mu-plugins/ folder and forget about it.
