/**
 * Legend module.
 *
 * @return singleton instance of the legend class (extends Widget).
 */
define([
  'underscore',
  'handlebars',
  'enquire',
  'map/presenters/LegendPresenter',
  'helpers/datasetsHelper',
  'text!map/templates/legend/legend.handlebars',
  'text!map/templates/legend/loss.handlebars',
  'text!map/templates/legend/imazon.handlebars',
  'text!map/templates/legend/fires.handlebars',
  'text!map/templates/legend/forest2000.handlebars',
  'text!map/templates/legend/pantropical.handlebars',
  'text!map/templates/legend/idnPrimary.handlebars',
  'text!map/templates/legend/intact2013.handlebars',
  'text!map/templates/legend/grump.handlebars',
  'text!map/templates/legend/stories.handlebars',
  'text!map/templates/legend/terra_i.handlebars',
  'text!map/templates/legend/concesiones_forestales.handlebars',
  'text!map/templates/legend/concesiones_forestalesType.handlebars',
  'text!map/templates/legend/hondurasForest.handlebars',
  'text!map/templates/legend/colombiaForestChange.handlebars',
  'text!map/templates/legend/tigers.handlebars',
  'text!map/templates/legend/dam_hotspots.handlebars',
  'text!map/templates/legend/us_land_cover.handlebars',
  'text!map/templates/legend/global_land_cover.handlebars',
  'text!map/templates/legend/forma.handlebars',
  'text!map/templates/legend/bra_biomes.handlebars',
  'text!map/templates/legend/plantations_by_type.handlebars',
  'text!map/templates/legend/plantations_by_species.handlebars',
  'text!map/templates/legend/oil_palm.handlebars',
  'text!map/templates/legend/gtm_forest_change.handlebars',
  'text!map/templates/legend/gtm_forest_cover.handlebars',
  'text!map/templates/legend/gtm_forest_density.handlebars',
  'text!map/templates/legend/khm_eco_land_conc.handlebars',
  'text!map/templates/legend/usa_forest_ownership.handlebars',
  'text!map/templates/legend/guyra_deforestation.handlebars',
  'text!map/templates/legend/logging_roads.handlebars',
  'text!map/templates/legend/rus_hrv.handlebars',
  'text!map/templates/legend/raisg_land_rights.handlebars',
  'text!map/templates/legend/mysPA.handlebars',
  'text!map/templates/legend/idn_peat.handlebars',
  'text!map/templates/legend/mys_peat.handlebars',
  'text!map/templates/legend/raisg_mining.handlebars',
  'text!map/templates/legend/per_mining.handlebars',
  'text!map/templates/legend/glad.handlebars',
  'text!map/templates/legend/urthecast.handlebars',
  'text!map/templates/legend/mex_forest_cat.handlebars',
  'text!map/templates/legend/mex_forest_subcat.handlebars',
  'text!map/templates/legend/pa.handlebars',
  'text!map/templates/legend/places2watch.handlebars',
  'text!map/templates/legend/mex_landrights.handlebars',
  'text!map/templates/legend/mexPA.handlebars',
  'text!map/templates/legend/perPA.handlebars',
  'text!map/templates/legend/mex_land_cover.handlebars',
  'text!map/templates/legend/mex_forest_conserv.handlebars',
  'text!map/templates/legend/mex_forest_prod.handlebars',
  'text!map/templates/legend/mex_forest_rest.handlebars',
  'text!map/templates/legend/bra_landcover.handlebars',
  'text!map/templates/legend/lbr_mining.handlebars',
  'text!map/templates/legend/lbr_forest.handlebars',
  'text!map/templates/legend/lbr_community.handlebars',
  'text!map/templates/legend/mangrove_2.handlebars',
  'text!map/templates/legend/bol_user_fire_frequency.handlebars',
], function(_, Handlebars, enquire, Presenter, datasetsHelper, tpl, lossTpl, imazonTpl, firesTpl,
    forest2000Tpl, pantropicalTpl, idnPrimaryTpl, intact2013Tpl, grumpTpl, storiesTpl, terra_iTpl, concesionesTpl,
    concesionesTypeTpl, hondurasForestTPL,colombiaForestChangeTPL, tigersTPL, dam_hotspotsTPL, us_land_coverTPL,
    global_land_coverTPL, formaTPL,bra_biomesTPL, gfwPlantationByTypeTpl, gfwPlantationBySpeciesTpl, oil_palmTpl,
    gtm_forest_changeTpl,gtm_forest_coverTpl,gtm_forest_densityTpl,khm_eco_land_concTpl,usa_forest_ownershipTpl,guyra_deforestationTpl,logging_roadsTpl,
    rus_hrvTpl, raisg_land_rightsTpl, mysPATpl, idn_peatTpl, mys_peatTpl,raisg_miningTpl, per_miningTpl, gladTpl, urtheTpl,mex_forest_catTpl,mex_forest_subcatTpl,
    paTpl, places2watchTPL, mex_landrightsTpl, mexPATpl, perPATpl,mex_land_coverTpl,mex_forest_conservTPL,mex_forest_prodTPL,mex_forest_restTPL, bra_landcoverTPL, lbr_miningTPL,
    lbr_forestTpl,lbr_communityTpl, mangrove2Tpl, bol_user_fire_frequencyTpl) {

  'use strict';

  var LegendView = Backbone.View.extend({

    el: '#module-legend',

    template: Handlebars.compile(tpl),

    model: new (Backbone.Model.extend({
      defaults:{
        hidden: true,
        categories_status: [],
      }
    })),

    /**
     * Optional layers detail templates.
     */
    detailsTemplates: {
      loss: Handlebars.compile(lossTpl),
      imazon: Handlebars.compile(imazonTpl),
      forest2000: Handlebars.compile(forest2000Tpl),
      pantropical: Handlebars.compile(pantropicalTpl),
      idn_primary: Handlebars.compile(idnPrimaryTpl),
      ifl_2013_deg: Handlebars.compile(intact2013Tpl),
      can_ifl: Handlebars.compile(intact2013Tpl),
      grump2000: Handlebars.compile(grumpTpl),
      user_stories:  Handlebars.compile(storiesTpl),
      terrailoss: Handlebars.compile(terra_iTpl),
      concesiones_forestales: Handlebars.compile(concesionesTpl),
      concesiones_forestalesNS: Handlebars.compile(concesionesTypeTpl),
      WMSLayer: Handlebars.compile(hondurasForestTPL),
      colombia_forest_change: Handlebars.compile(colombiaForestChangeTPL),
      tigers: Handlebars.compile(tigersTPL),
      dam_hotspots: Handlebars.compile(dam_hotspotsTPL),
      us_land_cover: Handlebars.compile(us_land_coverTPL),
      global_land_cover : Handlebars.compile(global_land_coverTPL),
      us_land_cover_change : Handlebars.compile(us_land_coverTPL),
      forma : Handlebars.compile(formaTPL),
      bra_biomes : Handlebars.compile(bra_biomesTPL),
      plantations_by_type: Handlebars.compile(gfwPlantationByTypeTpl),
      bra_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
      per_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
      lbr_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
      col_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
      khm_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
      idn_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
      mys_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
      plantations_by_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
      bra_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
      per_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
      lbr_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
      col_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
      khm_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
      idn_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
      mys_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
      oil_palm: Handlebars.compile(oil_palmTpl),
      gtm_forest_change1: Handlebars.compile(gtm_forest_changeTpl),
      gtm_forest_change2: Handlebars.compile(gtm_forest_changeTpl),
      gtm_forest_cover: Handlebars.compile(gtm_forest_coverTpl),
      gtm_forest_density: Handlebars.compile(gtm_forest_densityTpl),
      khm_eco_land_conc: Handlebars.compile(khm_eco_land_concTpl),
      usa_forest_ownership: Handlebars.compile(usa_forest_ownershipTpl),
      guyra:Handlebars.compile(guyra_deforestationTpl),
      logging_roads:Handlebars.compile(logging_roadsTpl),
      rus_hcv:Handlebars.compile(rus_hrvTpl),
      raisg:Handlebars.compile(raisg_land_rightsTpl),
      mys_protected_areas:Handlebars.compile(mysPATpl),
      raisg_mining:Handlebars.compile(raisg_miningTpl),
      bra_mining:Handlebars.compile(raisg_miningTpl),
      per_mining:Handlebars.compile(per_miningTpl),
      umd_as_it_happens:Handlebars.compile(gladTpl),
      umd_as_it_happens_per:Handlebars.compile(gladTpl),
      umd_as_it_happens_cog:Handlebars.compile(gladTpl),
      umd_as_it_happens_idn:Handlebars.compile(gladTpl),
      viirs_fires_alerts: Handlebars.compile(firesTpl),
      mex_forest_zoning_cat: Handlebars.compile(mex_forest_catTpl),
      mex_forest_zoning_subcat: Handlebars.compile(mex_forest_subcatTpl),
      mex_forest_zoning_conserv:Handlebars.compile(mex_forest_conservTPL),
      mex_forest_zoning_prod:Handlebars.compile(mex_forest_prodTPL),
      mex_forest_zoning_rest:Handlebars.compile(mex_forest_restTPL),
      urthe: Handlebars.compile(urtheTpl),
      protected_areasCDB:Handlebars.compile(paTpl),
      places_to_watch:Handlebars.compile(places2watchTPL),
      mex_land_rights:Handlebars.compile(mex_landrightsTpl),
      mexican_pa:Handlebars.compile(mexPATpl),
      per_protected_areas:Handlebars.compile(perPATpl),
      mex_land_cover:Handlebars.compile(mex_land_coverTpl),
      bra_land_cover:Handlebars.compile(bra_landcoverTPL),
      lbr_logging:Handlebars.compile(lbr_forestTpl),
      lbr_mineral_exploration_license:Handlebars.compile(lbr_miningTPL),
      lbr_resource_rights:Handlebars.compile(lbr_communityTpl),
      mangrove_2:Handlebars.compile(mangrove2Tpl),
      bol_user_fire_frequency:Handlebars.compile(bol_user_fire_frequencyTpl)
    },

    events: {
      'click .js-toggle-category' : 'toogleCategory',
      'click .js-toggle-sublayer': 'toggleLayer',
      'click .js-toggle-layer-option': 'toggleLayerOption',
      'click .js-layer-close' : 'removeLayer',
      'click .js-toggle-threshold' : 'toggleThreshold',
      'click .js-toggle-legend' : 'toogleLegend',
      'click .js-toggle-embed-legend' : 'toogleEmbedLegend',
    },

    initialize: function(map,countries) {
      this.presenter = new Presenter(this);

      this.map = map;
      this.countries = countries;

      this.listeners();

      enquire.register("screen and (min-width:"+window.gfw.config.GFW_MOBILE+"px)", {
        match: function(){
          this.mobile = false;
        }.bind(this)
      });
      enquire.register("screen and (max-width:"+window.gfw.config.GFW_MOBILE+"px)", {
        match: function(){
          this.mobile = true;
        }.bind(this)
      });

    },

    listeners: function() {
      this.listenTo(this.model, 'change:hidden', this.toogleModule, this);
    },

    render: function(html) {
      this.$el.html(html);
      this.cache();
    },

    cache: function() {
      // elements
      this.$window = $(window);
      this.$titleDialog = $('#title-dialog-legend');
      this.$categories = this.$el.find('.categories');
      this.$buttonLegendBox =  $('#button-box-embed-legend');
      this.$linkLegendBox =  $('#link-embed-legend');

      this.$more = this.$el.find('#legend-country-more');

      // vars
      this.embed = $('body').hasClass('is-embed-action');
    },

    /**
     *
     * @param  {array}  categories layers ordered by category
     * @param  {object} options    legend options
     */
    updateLegend: function(categories, options, geographic, iso, more) {
      var layersGlobal = [];
      var layersIso = [];
      var categoriesGlobal = [];
      var categoriesIso = [];
      var layers = _.flatten(categories);

      // Append details template to layer.
      _.each(layers, function(layer) {
        layer.source = (layer.slug === 'nothing') ? null : layer.source || layer.slug;
        if (this.detailsTemplates[layer.slug]) {
          layer.detailsTpl = this.detailsTemplates[layer.slug]({
            threshold: options.threshold || 30,
            hresolution: options.hresolution,
            startYear: options.startYear,
            layerTitle: layer.title
          });
        }

        if (layer.iso) {
          layersIso.push(layer);
          layer.category_status = layer.category_slug+'-iso';
        } else {
          layersGlobal.push(layer);
          layer.category_status = layer.category_slug+'-global'
        }

        layer.geographic = geographic ? 'checked' : '';
        // Temp
        layer.geographicTitle = layer.slug === 'loss'
          ? '2015 data coverage'
          : 'Geographic coverage';
        layer.geographicNote = layer.slug === 'loss'
          ? 'NOTE: 2015 tree cover loss is only for the tropics. View 2015 geographic coverage.'
          : '';
      }, this);


      categoriesGlobal = this.statusCategories(this.getLayersByCategory(layersGlobal));
      categoriesIso = this.statusCategories(this.getLayersByCategory(layersIso));

      // Render
      this.render(this.template({
        categories: (_.isEmpty(categoriesGlobal)) ? false : categoriesGlobal,
        categoriesIso: (_.isEmpty(categoriesIso)) ? false : categoriesIso,
        layersLength: layers.length,
        country: (!!iso) ? _.findWhere(this.countries, { iso: iso.country }) : null,
        more: more,
        countryVisibility: (!!more || !_.isEmpty(categoriesIso))
      }));

      this.presenter.toggleLayerOptions();
    },

    getLayersByCategory: function(layers) {
      var subscriptionsAllowed = datasetsHelper.getListSubscriptionsAllowed();
      return _.groupBy(layers, function(layer) {
        layer.allowSubscription = layer && subscriptionsAllowed.indexOf(layer.slug) > -1;

        // Hack to keep the forest_clearing slug in layers which have to be analyzed but not grouped by the said slug in the legend
        if (layer.category_slug === 'forest_clearing' && !layer.is_forest_clearing) return 'forest_clearing_2';
        return layer.category_slug;
      })
    },

    statusCategories: function(array){
      // Search for layer 'nothing'
      var categories_status = this.model.get('categories_status');
      _.each(array, function(category) {
        for (var i = 0; i< category.length; i++) {
          // Mantain categories closed in rendering
          category['closed'] = categories_status.indexOf(category[i]['category_status']) != -1;
          // Get layer's length of each category
          category['layers_length'] = i + 1;
        }
      }, this);

      return array;
    },

    /**
     * Set widget from layers object.
     *
     * @param  {array} categories, options, geographic
     */
    update: function(categories, options, geographic, iso, more) {

      if (categories.length === 0 && !more) {
        this.model.set({
          hidden: true
        });
      } else {
        this.model.set({
          hidden: false,
          boxClosed: false
        });
        this.updateLegend(categories, options, geographic, iso, more);
      }
    },

    /**
     *
     * UI EVENTS
     *
    */
    // category
    toogleCategory: function(e){
      if (!this.mobile) {
        // Save category status in an array
        var categories_status = this.model.get('categories_status');
        var slug = $(e.currentTarget).data('category_slug');
        var index = categories_status.indexOf(slug);

        // Generate the status of the categories
        (index != -1) ? categories_status.splice(index, 1) : categories_status.push(slug);
        this.model.set('categories_status',categories_status);

        $(e.currentTarget).parent().toggleClass('closed');
        $(e.currentTarget).parent().children('.layers').toggleClass('closed');
      }
    },

    toggleLayerOption: function(e) {
      if (!$(e.target).hasClass('source') && !$(e.target).parent().hasClass('source')) {
        var option = $(e.currentTarget).data('option');
        this.presenter.toggleLayerOption(option);
      }
    },

    toggleLayerOptions: function(layerOptions) {
      _.each(this.$el.find('.layer-option'), function(div) {
        var $div = $(div);
        var $toggle = $div.find('.onoffswitch');
        var optionSelected = layerOptions.indexOf($div.data('option')) > -1;
        var color = $toggle.data('color') || '#F69';

        if (optionSelected) {
          $toggle.addClass('checked').css('background', color);
        } else {
          $toggle.removeClass('checked').css('background', '');
        }
      }, this);
    },

    // layers
    toggleLayer: function(e) {
      if (!$(e.target).hasClass('source') && !$(e.target).parent().hasClass('source')) {
        var layerSlug = $(e.currentTarget).data('sublayer');
        this.presenter.toggleLayer(layerSlug);
      }
    },

    removeLayer: function(e){
      e && e.preventDefault();
      var layerSlug = $(e.currentTarget).data('slug');
      this.presenter.toggleLayer(layerSlug);
    },

    // threshold
    toggleThreshold: function(e){
      e && e.preventDefault();
      this.presenter.toggleThreshold();
    },

    // legend
    toogleLegend: function(bool){
      var to = (bool && bool.currentTarget) ? false : bool;
      this.$el.toggleClass('active', to);
      this.presenter.toggleOverlay(to);
    },

    // Toggle sublayers if they are selected
    toggleSelected: function(layers) {
      _.each(this.$el.find('.layer-sublayer'), function(div) {
        var $div = $(div);
        var $toggle = $div.find('.onoffswitch');
        var layer = layers[$div.data('sublayer')];

        if (layer) {
          $toggle.addClass('checked');
          $toggle.css('background', layer.category_color);
        } else {
          $toggle.removeClass('checked').css('background', '');
        }
      }, this);
    },

    // Toggle visibility
    toogleModule: function() {
      this.$el.toggleClass('hide', this.model.get('hidden'));
      this.$el.toggleClass('hide-no-layers', this.model.get('hidden'));
    },

    // Embed UI events
    toogleEmbedLegend: function(e){
      e && e.preventDefault();
      var active = this.$titleDialog.hasClass('active');
      this.$titleDialog.toggleClass('active', !active);
      this.$categories.toggleClass('active', !active);
      this.$buttonLegendBox.toggleClass('active', !active);
    },

    updateLinkToGFW: function(){
      if (this.embed && !!this.$linkLegendBox) {
        var href = window.location.href.replace('/embed','');
        this.$linkLegendBox.attr('href', href);
      }
    },



  });

  return LegendView;
});
