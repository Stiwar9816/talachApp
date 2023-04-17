<template>
  <v-layout>
    <!-- Navbar -->
    <nav>
      <slot name="navbar"></slot>
    </nav>
    <!-- Navbar -->

    <!-- Aside Menu -->
    <aside>
      <slot name="asideMenu"></slot>
    </aside>
    <!-- Aside Menu -->

    <!-- Children -->
    <slot> </slot>
    <!-- Children -->

    <!-- Footer -->
    <footer>
      <slot name="footer"></slot>
    </footer>
    <!-- Footer -->
  </v-layout>
</template>
