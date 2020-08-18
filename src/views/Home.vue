<template>
  <div class="container mx-auto">

    <h1>{{ status.type.name }} : {{ status.type.value }}</h1>
    <h1>{{ status.effectiveType.name }} : {{ status.effectiveType.value }}</h1>
    <h1>{{ status.rtt.name }} : {{ status.rtt.value }}</h1>
    <h1>{{ status.downlink.name }} : {{ status.downlink.value }}</h1>
    <h1>{{ status.downlinkMax.name }} : {{ status.downlinkMax.value }}</h1>
  </div>
</template>

<script>
const log = console;
export default {
  name: "Home",
  data() {
    return {
      supported: true,
      status: {
        type: {
          name: 'Type',
          value: undefined,
        },
        effectiveType: {
          name: 'Effective Type',
          value: undefined,
        },
        rtt: {
          name: 'Round Trip Time',
          unit: 'ms',
          value: undefined,
        },
        downlink: {
          name: 'Downlink',
          unit: 'Mb/s',
          value: undefined,
        },
        downlinkMax: {
          name: 'Max Downlink',
          unit: 'Mb/s',
          value: undefined,
        },
      },
    };
  },
  methods: {
    networkInfoHandler() {
      const c = navigator.connection;
      log.group('Network info event', c);
      // Network type that browser uses
      log.debug('type', c.type);
      // Effective bandwidth estimate
      log.debug('downlink', c.downlink);
      // Effective round-trip time estimate
      log.debug('rtt', c.rtt);
      // Upper bound on the downlink speed of the first network hop
      log.debug('downlinkMax', c.downlinkMax);
      // Effective connection type determined using a combination of recently
      // observed rtt and downlink values: ' +
      log.debug('effectiveType', c.effectiveType);
      log.groupEnd();
      this.status.type.value = c.type;
      this.status.downlink.value = c.downlink;
      this.status.rtt.value = c.rtt;
      this.status.downlinkMax.value = c.downlinkMax;
      this.status.effectiveType.value = c.effectiveType;
    },
  },
  mounted() {
    if (!navigator.connection) {
      const errorMsg = 'Network API not supported';
      log.error(errorMsg);
      this.$emit('error', errorMsg);
      this.supported = false;
    } else {
      log.info('Network API supported');
      navigator.connection.addEventListener('change', this.networkInfoHandler);
      this.networkInfoHandler();
    }
  }
};
</script>
