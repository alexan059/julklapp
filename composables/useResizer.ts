import { Ref, onMounted, onBeforeUnmount } from 'vue';

export default function (outerContent: Ref<HTMLElement>, innerContent: Ref<HTMLElement>) {
    let resizeObserver: ResizeObserver;

    const calculateContentHeight = (el) => {
        const style = getComputedStyle(el);
        const margin = parseInt(style.marginTop) + parseInt(style.marginBottom);

        return el.offsetHeight + margin;
    }

    onMounted(() => {
        resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
            for (let entry of entries) {
                if (entry.target === innerContent.value) {
                    const contentHeight = calculateContentHeight(entry.target);
                    outerContent.value.style.height = contentHeight + 'px';
                }
            }
        });
        resizeObserver.observe(innerContent.value);
    });

    onBeforeUnmount(() => resizeObserver.disconnect());
}