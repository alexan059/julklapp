import { inject } from 'vue';
import { GroupListItem } from '~/types';


export default function () {
    const groups = inject<GroupListItem[]>('groups');
    const updateGroups = inject('updateGroups');

    const joinGroup = async (uid) => {
        const { success, redirect } = await $fetch('/api/group/join', { method: 'POST', body: { uid } });

        success && await updateGroups();

        return { success, redirect };
    };

    const deleteGroup = async (uid) => {
        const { success } = await $fetch('/api/groups', { method: 'DELETE', params: { uid } });

        success && await updateGroups();

        return success;
    };

    const leaveGroup = async (uid) => {
        const { success, redirect } = await $fetch('/api/group/leave', { method: 'POST', body: { uid } });

        success && await updateGroups();

        return { success, redirect };
    };

    const groupActions = {
        updateGroups,
        deleteGroup,
        joinGroup,
        leaveGroup,
    };

    return [groups, groupActions];
}