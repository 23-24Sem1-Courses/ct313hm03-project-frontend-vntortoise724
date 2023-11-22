<script setup>
defineProps ({
    user: { type: Object, required: true}
});

</script>

<template>
    <div>
        <div class="p-1">
            <strong>Username: </strong>
            {{ user.username }}
        </div>
        <div class="p-1">
            <strong>Full Name: </strong>
            {{ user.last_name }} {{ user.first_name }}
        </div>
        <div class="p-1">
            <strong>Email: </strong>
            {{ user.email }}
        </div>
    </div>
</template>