/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test ensures each feed
         * in the allFeeds object has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL defined for each feed', function() {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            };
        });


        /* This test ensures each feed
         * in the allFeeds object has a name defined
         * and that the name is not empty.
         */
        it ('should have a name defined for each feed', function() {
           for (feed of allFeeds) {
               expect(feed.name).toBeDefined();
               expect(feed.name.length).not.toBe(0);
           };
        });
    });


    /*This test suite tests the menu functionality */
    describe('The menu', function() {
        const body = document.querySelector('body');
        /* This test ensures the menu element is
         * hidden by default by checking that the
         menu-hidden class is applied to the body element.
         */
        it('should be hidden by default', function () {
            expect(body.classList).toContain('menu-hidden');
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          It simulates a click on the menu icon, checks to see if
          the menu-hidden class was removed from the body element,
          then simulates another click, and tests whether
          the menu-hidden class was added again.
          */
        it('should show/hide when the menu icon is clicked', function() {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(body.classList).not.toContain('menu-hidden');

            menuIcon.click();
            expect(body.classList).toContain('menu-hidden');
        });
    });

    /* This test suite checks the initial entries on the feed. */
    describe('Initial Entries', function() {
        /* Loads feed and uses done for asynchronous test. */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should have at least one .entry in .feed', function() {
            const entry = document.querySelectorAll('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
        });
    });

    /* This test suite checks what happens when new feeds are selected. */
    describe('New Feed Selection', function () {
        let feedZeroEntry;
        let feedOneEntry;

       /* Loads first and second feeds to get first entry value for each.
          Done is used for asynchronous testing */
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedZeroEntry = document.querySelector('.feed .entry').innerHTML;
                loadFeed(1, function() {
                    feedOneEntry = document.querySelector('.feed .entry').innerHTML;
                    done();
                });
            });
        });
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes
         * by comparing the innerHTML of the first entry on the first feed
         * to the innerHTML of the first entry on the second feed.
         */
        it('should change content when new feed is loaded', function() {
            expect(feedOneEntry).not.toBe(feedZeroEntry);
        });
    });
}());
