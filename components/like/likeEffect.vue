<template lang="html">
  <svg
    :class="$style.effect"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 300 300"
    enable-background="new 0 0 300 300"
    xml:space="preserve"
  >
    <circle :class="$style.circle" cx="150" cy="130" r="20" fill="none" />
    <g :class="$style.icon" @animationend="anEnd">
      <use xlink:href="#liked" width="100" height="100" x="100" y="140"></use>
    </g>
    <g :class="$style.lines">
      <g
        v-for="(line, index) in lines"
        fill="none"
        :transform="line.rotate"
        :key="index"
      >
        <path
          v-for="(path, index) in paths"
          :class="path.class"
          :d="path.d"
          :key="index"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="0 -20"
            begin="0.3s"
            dur="0.5s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            repeatCount="0"
          />
        </path>
      </g>
    </g>
  </svg>
</template>

<script>
// safari does not support negative stroke-dashoffset, what a f**k *!
export default {
  name: 'woo-like-effect',
  data() {
    return {
      lines: [
        { rotate: 'rotate(0, 150, 130)' },
        { rotate: 'rotate(-50, 150, 130)' },
        { rotate: 'rotate(50, 150, 130)' },
        { rotate: 'rotate(-100, 150, 130)' },
        { rotate: 'rotate(100, 150, 130)' }
      ],
      paths: [
        {
          d: 'M150 115V70',
          class: this.$style.path
        },
        {
          d: 'M150 70v45',
          class: [this.$style.path, this.$style.reverse]
        }
      ]
    };
  },
  methods: {
    anEnd() {
      this.$emit('effect-end', true);
    }
  }
};
</script>

<style lang="postcss" module>
:root {
  --w-like-effect-size: 180px;
}

.effect {
  width: var(--w-like-effect-size);
  height: var(--w-like-effect-size);
  pointer-events: none;
}

.icon {
  transform-origin: center;
  animation: like 1s ease-in-out both;
}

.circle {
  stroke: #ffb800;
  stroke-width: 20;
  animation: shine 0.5s 0.2s ease-in-out both;
  transform-origin: center;
}

.path {
  stroke: #f48700;
  stroke-dasharray: 45;
  stroke-dashoffset: 45;
  stroke-linecap: round;
  stroke-width: 10;
  animation: dash 0.3s 0.2s ease both;
}

.reverse {
  animation: dashReverse 0.2s 0.5s ease both;
}

@keyframes dash {
  from {
    stroke-dashoffset: 45;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  to {
    stroke-dashoffset: 0;
    visibility: hidden;
  }
}

@keyframes dashReverse {
  from {
    stroke-dashoffset: 0;
    visibility: hidden;
  }

  90% {
    opacity: 1;
  }

  to {
    stroke-dashoffset: 45;
    opacity: 0;
  }
}

@keyframes shine {
  from {
    transform: scale3d(0.5, 0.5, 0.5);
    visibility: hidden;
    opacity: 0.3;
  }

  10% {
    transform: scale3d(1, 1, 1);
  }

  to {
    transform: scale3d(3, 3, 3);
    stroke-width: 0;
    opacity: 0;
  }
}

@keyframes like {
  0% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  30% {
    transform: rotate3d(0, 0, 1, -5deg) scale3d(1.5, 1.5, 1.5);
  }

  65% {
    transform: scale3d(0.7, 0.7, 0.7);
    transform-origin: center;
  }

  80% {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
