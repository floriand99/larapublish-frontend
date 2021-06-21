<template>
    <Main title="Edit profile details">
    <div class="lg:mx-auto lg:w-7/12 my-10 space-y-8">
        <div>
            <div class="text-2xl font-semibold mb-4">Profile</div>
            <hr />
        </div>
        <div>
            <div class="mb-2 text-gray-600">Profile image</div>
            <div v-if="user.image">
            <img :src="'https://calm-forest-02990.herokuapp.com/'+ user.image" class="my-6 w-48 h-48 rounded-full object-cover" />
            <button @click="deleteImage()" class="bg-blue-100 text-blue-600 p-3 text-sm rounded mt-3">Change profile image</button>
            </div>
            <upload-image 
            v-else
                v-on:setImage="updateImage"
                ref="uploadRef" />
        </div>
        <div>
            <div class="mb-2 text-gray-600">Full name</div>
            <input
                type="text"
                class="px-6 py-4 shadow-md rounded-md w-full"
                placeholder="Enter full name"
                v-model="user.name"
            />
        </div>
        <div>
            <div class="mb-2 text-gray-600">Bio / Description</div>
            <input
                type="text"
                class="px-6 py-4 shadow-md rounded-md w-full"
                placeholder="Tell us about yourself"
                v-model="user.bio"
            />
        </div>
        <button
            @click="save()"
            class="px-6 py-3 bg-green-500 text-white font-medium rounded"
        >
            Save changes
        </button>
    </div>
    </Main>
</template>

<script>
import Main from './Main'
import {ImageService, UserService} from '@/services/api.service'

export default {
    name: "EditProfile",
    components: {
        UploadImage: () => import('.././components/UploadImage'),
        Main
    },
    data() {
        return {
            user: {},
            loading: true
        };
    },
    async created(){
        let res = await UserService.get(this.$store.state.user.id)
        this.user = res.data
        this.loading = false
    },
    methods: {
        async deleteImage(){
            await ImageService.delete(this.user.image)
            this.user.image = null
        },
        updateImage(image) {
            this.user.image = image;
        },
        async save() {
            try{
                let res = await UserService.update(this.$store.state.user.id, {
                    name: this.user.name,
                    bio: this.user.bio,
                    image: this.user.image,
                    email: this.user.email,
                    password: this.user.password,
                })
                    this.user = res.data
                    this.$store.dispatch('displayAlert', {
                        message: `Your profile details were updated successfully!`,
                        color: 'green'
                    })
            }catch(err){
                this.$store.dispatch('displayAlert', {
                        message: `Your account details could not be updated, try again later!`,
                        color: 'red'
                    })
            }
        },
    },
};
</script>