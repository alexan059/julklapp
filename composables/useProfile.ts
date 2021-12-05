import { ref, provide, inject } from 'vue';
import useLocalStorage from '~/composables/useLocalStorage';
import { User } from '~/types';

export const provideProfile = () => {
    const user = ref<User>();

    const { storeItem, valueExists, getItem } = useLocalStorage();

    const fetchUser = async (force: boolean = false) => {
        if (!force && valueExists('user')) {
            user.value = getItem('user') as User;
            return;
        }

        try {
            const data = await $fetch('/api/user');
            storeItem('user', data.user);
            user.value = data.user;
        } catch (e) {
            // not logged in
        }
    };

    provide('user', user);
    provide('fetchUser', fetchUser);

    return [user, fetchUser];
};

export default function () {
    const user = inject<User>('user');
    const fetchUser = inject('fetchUser');

    const updateProfile = async (name: string, avatar: string, item_like: string, item_dislike: string) => {
        try {
            const { success } = await $fetch('/api/user', {
                method: 'PUT',
                body: { name, avatar, item_like, item_dislike },
            });

            success && await fetchUser(true);

            return { error: null };
        } catch (e) {
            return { error: e.data.statusMessage };
        }
    };

    const userActions = {
        fetchUser,
        updateProfile,
    };

    return [user, userActions];
}