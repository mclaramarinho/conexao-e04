<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-expansion-panels variant="popout">
                    <v-expansion-panel v-for="(item, i) in faq" :key="i"
                        
                        :title="item.question"
                        :text="item.answer"
                    />
                </v-expansion-panels>
                
            </v-col>
        </v-row>
    </v-container>

</template>

<script lang="ts">
export default {
    name: 'FaqSection',
    data() {
        return {
            faq: [
                {
                    question: 'What is the purpose of this website?',
                    answer: 'This website is a project for the course "Web Development" at the University of Applied Sciences in Salzburg. The goal is to create a website that is easy to use and provides useful information for students.'
                },
                {
                    question: 'How can I contact the developers?',
                    answer: 'You can contact the developers via email at '
                },
                {
                    question: 'How can I contribute to the website?',
                    answer: 'You can contribute to the website by creating a pull request on the GitHub repository.'
                },
                {
                    question: 'How can I report a bug?',
                    answer: 'You can report a bug by creating an issue on the GitHub repository.'
                }
            ]
        }
    }
}
</script>