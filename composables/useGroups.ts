import { inject, provide, ref } from 'vue';
import useLocalStorage from '~/composables/useLocalStorage';
import { GroupList } from '~/types';

export const provideGroups = () => {
    const groups = ref([]);

    const { storeItem, getItem, valueExists } = useLocalStorage();

    const fetchGroups = async (force: boolean = false) => {
        if (!force && valueExists('groups')) {
            groups.value = getItem('groups') as [];
            return;
        }

        try {
            const data = await $fetch('/api/groups');
            storeItem('groups', data.groups);
            groups.value = data.groups;
        } catch (e) {
            // not logged in
        }
    };

    provide('groups', groups);
    provide('fetchGroups', fetchGroups);

    return [groups, fetchGroups];
};

export default function () {
    const groups = inject<GroupList>('groups');
    const fetchGroups = inject('fetchGroups');

    const fetchGroup = async (uid: string) => await $fetch('/api/group', { params: { uid } });

    const createInvitation = async (uid: string) => {
        const { url } = await $fetch('/api/group/invitation', { params: { uid } });

        return url;
    };

    const createGroup = async (name: string, description: string) => {
        try {
            const { uid, success } = await $fetch('/api/group', { method: 'POST', body: { name, description } });

            success && await fetchGroups(true);

            return { uid, error: null };
        } catch (e) {
            return { error: e.data.statusMessage };
        }
    };

    const joinGroup = async (uid: string) => {
        const { success, redirect } = await $fetch('/api/group/join', { method: 'POST', body: { uid } });

        success && await fetchGroups(true);

        return { success, redirect };
    };

    const deleteGroup = async (uid: string) => {
        const { success } = await $fetch('/api/groups', { method: 'DELETE', params: { uid } });

        success && await fetchGroups(true);

        return success;
    };

    const leaveGroup = async (uid: string) => {
        const { success, redirect } = await $fetch('/api/group/leave', { method: 'POST', body: { uid } });

        success && await fetchGroups(true);

        return { success, redirect };
    };

    const groupActions = {
        fetchGroup,
        fetchGroups,
        createGroup,
        deleteGroup,
        joinGroup,
        leaveGroup,
        provideGroups,
        createInvitation,
    };

    return [groups, groupActions];
}