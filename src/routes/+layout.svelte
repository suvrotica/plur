<script lang="ts">
    import "@picocss/pico";
</script>

<main class="container">
    <article>
        <header><nav>
            <ul>
              <li><img src="logo.png" alt="logo" width="10%"></li>
            </ul>
            <ul>
              <li><a href="./">Home</a></li>
             
            </ul>
          </nav></header>
        <slot/>
        <footer>Footer</footer>
      </article>
</main>

