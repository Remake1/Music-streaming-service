import {defineStore} from "pinia";

export const useLockHoverStore = defineStore( 'lockHover', {
   state: () => ({
       isHovered: false,
   }),
    actions: {
        setHovered(){
            this.isHovered = true;
        },
        setUnhovered(){
            this.isHovered = false;
        }
    }
});