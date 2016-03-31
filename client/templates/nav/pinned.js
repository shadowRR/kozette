Template.pinned.helpers({
     /**
      * @summary humanize the time
      * @return {string}
      */
    messages() {
        let query = MessagesPinned.find( {}, { sort: { created_at: 'desc' } } );
        return query;
    }
 });