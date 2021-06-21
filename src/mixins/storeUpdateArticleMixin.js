import {ArticleService} from '@/services/api.service'
import { VueEditor } from "vue2-editor";
import UploadImage from "@/components/UploadImage";
import Main from "@/views/Main";
const mixin = {
    data() {
        return {
            errors: {
                title: '',
                tags: ''
            },
            title: "",
            content: "",
            contentCharCount: 0,
            image: "",
            tags: [],
            customToolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
            ],
        };
    },
    components: {
        VueEditor,
        UploadImage,
        Main,
    },
    watch:{
        content(){
            this.contentCharCount = this.$refs.vueEditor.quill.getText().length - 1
        }
    },
    computed: {
        titleValidation(){
            return {
                count: this.title.length,
                passed: this.title.length >= 5 && this.title.length <= 150
            }
        },
        tagsValidation(){return {passed: this.tags.length >=1 && this.tags.length <= 5} },
        imageValidation(){
            return{
                passed: this.image !== ''
            }
        },
        contentValidation(){
            return{
                passed: this.contentCharCount >= 100 && this.contentCharCount <= 12000
            }
        }
    },
    methods: {
        addTag(e) {
            if (this.tags.length > 4) return;
            e.preventDefault();
            let value = e.target.value.trim();
            if (value.length > 3) {
                for(const tag of this.tags)
                    if(tag === value)
                        return
                this.tags.push(value);
                e.target.value = "";
            }
        },
        removeLastTag(e){
            if(e.target.textLength == 0 && this.tags.length > 0)
                this.tags.pop()
        },
        updateImage(image) {
            this.image = image;
        },
        checkForm(){
            if(this.titleValidation.passed && this.tagsValidation && this.imageValidation)
                return true
            return false
        },
        async publish() {
            let validated = this.checkForm()
            if(validated){
                let data = {
                    title: this.title,
                    content: this.content,
                    image: this.image,
                    tags: this.tags,
                }
                try{
                    await ArticleService.store(data)
                    this.$store.dispatch('displayAlert', {
                        message: `Your article was published successfully!`,
                        color: 'green'
                    })
                }catch(err){
                        this.$store.dispatch('displayAlert', {
                        message: 'An error occurred, your article could not be published!',
                        color: 'red'
                    })
                }
            }
            else
                this.$store.dispatch('displayAlert', {
                    message: 'Your article was not published, please make sure you entered valid data!',
                    color: 'red'
                })
        },
    },
}
export default mixin