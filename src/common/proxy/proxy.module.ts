
import { Module } from "@nestjs/common";
import { clintProxySuperFlys } from "./client-proxy";

@Module({
    providers:[clintProxySuperFlys],
    exports:[clintProxySuperFlys]
})

export class ProxyModule{}