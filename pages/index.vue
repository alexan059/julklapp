<template>
  <main>
    <section ref="heroRef" class="hero">
      <div class="wrapper">
        <div class="heading">
          <h1 class="title">
            <span class="text" ref="titleRef">JulklAPP</span>
            <span class="emoji" ref="presentRef">
              <EmojiIcon char="🎁"/>
            </span>
          </h1>
          <h2 ref="subtitleRef" class="subtitle">Connect with your friends</h2>
          <div ref="buttonRef" class="action">
            <NuxtLink v-if="!loggedIn" class="button" to="/login">Join Today</NuxtLink>
            <NuxtLink v-else class="button" to="/dashboard">Dashboard</NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <section ref="info1Ref" class="info reverse">
      <div class="image">
        <img ref="image1Ref" src="~/assets/img/groups.png" alt="groups">
      </div>
      <div>
        <h3 ref="heading1Ref">Create groups</h3>
        <p ref="text1Ref">
          Join in a group with your friends.
          You can create multiple groups with different friends.
        </p>
      </div>
    </section>
    <section ref="info2Ref" class="info">
      <div>
        <h3 ref="heading2Ref">Edit your profile</h3>
        <p ref="text2Ref">Add an Avatar and Nickname for your friends to recognize you.
          Also, add your most favorite and least favorite things.
          Only the one you will receive the gift from will see those things.</p>
      </div>
      <div class="image">
        <img ref="image2Ref" src="~/assets/img/profile.png" alt="profile">
      </div>
    </section>
    <section ref="info3Ref" class="info reverse">
      <div class="image">
        <img ref="image3Ref" src="~/assets/img/qrcode.png" alt="qrcode">
      </div>
      <div>
        <h3 ref="heading3Ref">Invite with QR code</h3>
        <p ref="text3Ref">Just scan the code to join a group or enter the shared invitation link.</p>
      </div>
    </section>
    <section ref="footerRef" class="footer">
      <Center>
        <div ref="footerButtonRef">
          <NuxtLink v-if="!loggedIn" class="button big indigo" to="/login">Join Now</NuxtLink>
          <NuxtLink v-else class="button big indigo" to="/dashboard">Dashboard</NuxtLink>
        </div>
      </Center>
    </section>
  </main>
</template>

<script lang="ts" setup>
import useAuth from '~/composables/useAuth';
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tween = gsap.core.Tween;

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const titleRef = ref(null);
const presentRef = ref(null);
const subtitleRef = ref(null);
const buttonRef = ref(null);
const heroRef = ref(null);

const info1Ref = ref(null);
const image1Ref = ref(null);
const heading1Ref = ref(null);
const text1Ref = ref(null);

const info2Ref = ref(null);
const image2Ref = ref(null);
const heading2Ref = ref(null);
const text2Ref = ref(null);

const info3Ref = ref(null);
const image3Ref = ref(null);
const heading3Ref = ref(null);
const text3Ref = ref(null);

const footerRef = ref(null);
const footerButtonRef = ref(null);

const { isLoggedIn } = useAuth();

const loggedIn = ref(false);

const tween = ref([]);

declare type LayoutChangeCallbackFunction = (matches: boolean) => void;

function addMediaQueryWatcher(mediaQuery: string, layoutChangedCallback: LayoutChangeCallbackFunction) {
  const mediaQueryList = window.matchMedia(mediaQuery);
  mediaQueryList.addEventListener('change', function (e) { return layoutChangedCallback(e.matches); });
  layoutChangedCallback(mediaQueryList.matches);
}

onMounted(() => {

  addMediaQueryWatcher('(max-width: 767px)', (matches) => {
    // reset all tweens
    tween.value = tween.value.filter((tween: Tween) => {
      tween.invalidate(); // initial position
      tween.kill(); // remove gsap from element
    }); // filter will always return false = empty array

    if (matches) {

      tween.value.push(gsap.to(titleRef.value, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'center center',
          scrub: true,
        },
        x: -500,
      }));
      tween.value.push(gsap.to(subtitleRef.value, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'center center',
          scrub: true,
        },
        x: 500,
      }));
      tween.value.push(gsap.to(buttonRef.value, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'center center',
          scrub: true,
        },
        y: 200,
        scale: 2,
        opacity: 0,
      }));
      tween.value.push(gsap.to(presentRef.value, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'center center',
          scrub: true,
        },
        y: -300,
        rotateZ: 100,
      }));

      tween.value.push(gsap.from(image1Ref.value, {
        scrollTrigger: {
          trigger: info1Ref.value,
          toggleActions: 'restart play pause reverse',
          start: 'center center+=100px',
        },
        x: -200,
        opacity: 0,
      }));
      tween.value.push(gsap.from(heading1Ref.value, {
        scrollTrigger: {
          trigger: info1Ref.value,
          start: 'top bottom',
          end: 'center bottom',
          scrub: true,
        },
        scale: 0.5,
        opacity: 0,
      }));
      tween.value.push(gsap.from(text1Ref.value, {
        scrollTrigger: {
          trigger: info1Ref.value,
          start: 'top bottom',
          end: 'center bottom-=200px',
          scrub: true,
        },
        scale: 0.5,
        opacity: 0,
      }));

      tween.value.push(gsap.from(image2Ref.value, {
        scrollTrigger: {
          trigger: info2Ref.value,
          toggleActions: 'restart play pause reverse',
          start: 'center center',
        },
        x: 200,
        opacity: 0,
      }));
      tween.value.push(gsap.from(heading2Ref.value, {
        scrollTrigger: {
          trigger: info2Ref.value,
          start: 'top bottom',
          end: 'center bottom',
          scrub: true,
        },
        scale: 0.5,
        opacity: 0,
      }));
      tween.value.push(gsap.from(text2Ref.value, {
        scrollTrigger: {
          trigger: info2Ref.value,
          start: 'top bottom',
          end: 'center bottom-=200px',
          scrub: true,
        },
        scale: 0.5,
        opacity: 0,
      }));

      tween.value.push(gsap.from(image3Ref.value, {
        scrollTrigger: {
          trigger: info3Ref.value,
          toggleActions: 'restart play pause reverse',
          start: 'center center',
        },
        x: -200,
        opacity: 0,
      }));
      tween.value.push(gsap.from(heading3Ref.value, {
        scrollTrigger: {
          trigger: info3Ref.value,
          start: 'top bottom',
          end: 'center bottom',
          scrub: true,
        },
        scale: 0.5,
        opacity: 0,
      }));
      tween.value.push(gsap.from(text3Ref.value, {
        scrollTrigger: {
          trigger: info3Ref.value,
          start: 'top bottom',
          end: 'center bottom-=200px',
          scrub: true,
        },
        scale: 0.5,
        opacity: 0,
      }));

      tween.value.push(gsap.from(footerRef.value, {
        scrollTrigger: {
          trigger: footerButtonRef.value,
          start: 'top bottom',
          scrub: true,
        },
        y: -200,
        scale: 0.5,
      }));

    } else {
      tween.value.push(gsap.to(titleRef.value, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'center center',
          scrub: true,
        },
        rotateZ: -100,
        x: -500,
        y: -400,
      }));
      tween.value.push(gsap.to(subtitleRef.value, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'center center',
          scrub: true,
        },
        y: -300,
      }));
      tween.value.push(gsap.to(buttonRef.value, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'center center',
          scrub: true,
        },
        y: 200,
        scale: 2,
        opacity: 0,
      }));
      tween.value.push(gsap.to(presentRef.value, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'center center',
          scrub: true,
        },
        x: 300,
        rotateZ: 100,
      }));

      tween.value.push(gsap.from(image1Ref.value, {
        scrollTrigger: {
          trigger: info1Ref.value,
          toggleActions: 'restart play reverse reset',
          start: 'top center',
          end: 'top 100px',
        },
        x: -500,
        opacity: 0,
      }));
      tween.value.push(gsap.to(heading1Ref.value, {
        scrollTrigger: {
          trigger: info1Ref.value,
          start: 'center center+=100px',
          scrub: true,
        },
        y: -400,
      }));
      tween.value.push(gsap.to(text1Ref.value, {
        scrollTrigger: {
          trigger: info1Ref.value,
          start: 'center center+=100px',
          scrub: true,
        },
        y: -300,
      }));

      tween.value.push(gsap.from(image2Ref.value, {
        scrollTrigger: {
          trigger: info2Ref.value,
          toggleActions: 'restart play reverse reset',
          start: 'top center',
          end: 'top 100px',
        },
        x: 500,
        opacity: 0,
      }));
      tween.value.push(gsap.to(heading2Ref.value, {
        scrollTrigger: {
          trigger: info2Ref.value,
          start: 'center center+=100px',
          scrub: true,
        },
        y: -400,
      }));
      tween.value.push(gsap.to(text2Ref.value, {
        scrollTrigger: {
          trigger: info2Ref.value,
          start: 'center center+=100px',
          scrub: true,
        },
        y: -300,
      }));

      tween.value.push(gsap.from(image3Ref.value, {
        scrollTrigger: {
          trigger: info3Ref.value,
          toggleActions: 'restart play reverse reset',
          start: 'top center',
          end: 'top 100px',
        },
        x: -500,
        opacity: 0,
      }));
      tween.value.push(gsap.to(heading3Ref.value, {
        scrollTrigger: {
          trigger: info3Ref.value,
          start: 'center center+=100px',
          scrub: true,
        },
        y: -400,
      }));
      tween.value.push(gsap.to(text3Ref.value, {
        scrollTrigger: {
          trigger: info3Ref.value,
          start: 'center center+=100px',
          scrub: true,
        },
        y: -300,
      }));

      tween.value.push(gsap.from(footerRef.value, {
        scrollTrigger: {
          trigger: footerButtonRef.value,
          start: 'top bottom',
          scrub: true,
        },
        y: -200,
        scale: 0.5,
      }));
    }
  });

  loggedIn.value = isLoggedIn();

});

</script>

<style lang="scss" scoped>
main {
  color: #f0f0f0;
}

section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    padding: 0 15%;

    .heading {
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 8vw;
        font-weight: 700;

        .text {
          margin-right: 1rem;

          @media screen and (max-width: 767px) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 767px) {
          font-size: 12vw;
          flex-direction: column-reverse;
        }
      }

      .subtitle {
        margin: 0 0 2rem 0;
        font-size: 3vw;
        font-weight: 400;

        @media screen and (max-width: 767px) {
          font-size: 4vw;
          text-align: center;
        }
      }

      .action {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media screen and (max-width: 767px) {
        text-align: center;
      }
    }
  }
}


.info {
  display: flex;
  flex-direction: row;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 0;
    flex-grow: 1;
    padding: 4rem;

    &.image {
      position: relative;
      padding: 1rem;
      overflow: hidden;
    }

    h3 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 600;

      @media screen and (max-width: 767px) {
        font-size: 1.75rem;
      }
    }

    p {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 300;

      @media screen and (max-width: 767px) {
        font-size: 1.125rem;
      }
    }

    > *:not(:last-child) {
      margin-bottom: 2rem;
    }

    @media screen and (max-width: 767px) {
      padding: 2rem;
      justify-content: flex-end;

      &:last-child {
        justify-content: flex-start;
      }
    }
  }

  &.reverse {
    @media screen and (max-width: 767px) {
      flex-direction: column-reverse;
    }

    > div {
      @media screen and (max-width: 767px) {
        justify-content: flex-start;

        &:last-child {
          justify-content: flex-end;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
}

.button {
  margin: auto;
  padding: .75rem 1.25rem;
  background: none;
  border: 2px solid #f0f0f0;
  border-radius: 16px;
  color: #f0f0f0;
  font-size: 24px;
  font-weight: 400;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    border-color: #ff4757;
    color: #ff4757;
  }

  &:focus {
    outline: none;
  }

  &.big {
    font-size: 48px;
    border-width: 4px;

    @media screen and (max-width: 767px) {
      font-size: 24px;
      border-width: 2px;
    }
  }

  &.indigo:hover {
    border-color: #5352ed;
    color: #5352ed;
  }

  @media screen and (max-width: 767px) {
    font-size: 12px;
    border-width: 1px;
  }
}
</style>