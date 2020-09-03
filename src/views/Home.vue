<template>
  <div>
    <div class="flex flex-wrap items-start justify-between">
      <h1 class="text-3xl mb-6">Home</h1>
    </div>
    <div class="flex" style="height: 88vh;">
      <HistoryLive/>
    </div>
  </div>
</template>

<script>
import HistoryLive from "@/components/Dashboards/HistoryLive";

const log = console;
export default {
  name: "Home",
  components: {
    HistoryLive
  },
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
