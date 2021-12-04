import { ref, computed } from 'vue';
import emojiJSON from 'emoji.json';

const excluded = ['Component', 'Symbols', 'Flags'];

const groups = [{
    name: 'Smileys & Emotion',
    char: '😀',
    excluded: [],
}, {
    name: 'People & Body',
    char: '👥',
    excluded: [],
}, {
    name: 'Animals & Nature',
    char: '🐶',
    excluded: [],
}, {
    name: 'Food & Drink',
    char: '🍟',
    excluded: [],
}, {
    name: 'Travel & Places',
    char: '🗼',
    excluded: [],
}, {
    name: 'Activities',
    char: '🏓',
    excluded: ['♟'],
}, {
    name: 'Objects',
    char: '🧸',
    excluded: [],
}];

export default function () {
    const group = ref(groups[0]);
    const selectedGroup = computed(() => group.value.name);
    const emojis = computed(() => emojiJSON
        .filter(e => e.group.match(group.value.name) && !excluded.includes(group.value.name)) // filter by group
        .filter(e => e.codes.split(' ').length === 1 && !group.value.excluded.includes(e.char)), // exclude some
    );

    const selectGroup = (name) => {
        if (groups.map(g => g.name).includes(name)) {
            group.value = groups.filter(g => g.name.match(name)).pop();
        }
    };

    return [emojis, groups, { selectGroup }, selectedGroup];
}